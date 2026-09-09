"""Read the actual lesson diagrams/tables and compare them with language predicates.

Run with Python 3: python modelim/_checks/check_models.py
No third-party packages. The underscore directory is not published by Jekyll.
Bounded execution complements, rather than replaces, the proofs in the lessons.
"""
from itertools import product
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
COUNT = 0


def source(number):
    return next(ROOT.glob(f'{number:02}-*.md')).read_text(encoding='utf-8')


def clean(cell):
    return cell.strip().replace('`', '')


def tables(number):
    groups = re.findall(r'(?:^\|.*\|\s*\n)+', source(number), re.M)
    return [[list(map(clean, row.strip().strip('|').split('|')))
             for row in group.strip().splitlines()[2:]] for group in groups]


def diagram(number, index=0):
    blocks = re.findall(r'```mermaid\n(.*?)```', source(number), re.S)
    block = blocks[index]
    assert block.startswith('stateDiagram-v2')
    edges = re.findall(r'^\s*(\w+) --> (\w+): (.+)$', block, re.M)
    initial = re.search(r'start --> (\w+)', block)[1]
    final = set(re.search(r'class (\S+) accepting', block)[1].split(','))
    return initial, final, edges


def fa_diagram(number, index=0):
    initial, final, edges = diagram(number, index)
    transitions = {}
    for src, dst, label in edges:
        for symbol in label.split(','):
            assert symbol != 'ε', 'Forbidden epsilon transition'
            transitions.setdefault((src, symbol), set()).add(dst)
    return initial, final, transitions


def fa_table(number, table_index, alphabet, initial, final, state_col=0, first_input=1):
    transitions = {}
    for row in tables(number)[table_index]:
        state = row[state_col]
        for label, target in zip(alphabet, row[first_input:]):
            if target in ('—', 'לא מוגדר'):
                continue
            for symbol in label.split(','):
                assert (state, symbol) not in transitions
                transitions[state, symbol] = {target}
    return initial, set(final), transitions


def fa_run(model, word):
    initial, final, edges = model
    states = {initial}
    for symbol in word:
        states = set().union(*(edges.get((q, symbol), set()) for q in states))
    return bool(states & final)


def exhaustive(name, alphabet, length, run, predicate):
    global COUNT
    cases = 0
    for size in range(length + 1):
        for chars in product(alphabet, repeat=size):
            word = ''.join(chars)
            actual, expected = run(word), bool(predicate(word))
            assert actual == expected, (name, repr(word), actual, expected)
            COUNT += 1
            cases += 1
    print(f'PASS {name}: {cases:,} words')


def pda_diagram(number):
    initial, final, edges = diagram(number)
    transitions = {}
    for src, dst, label in edges:
        symbol, rest = label.split(', ')
        top, operation = rest.split('/')
        assert symbol != 'ε'
        key = src, symbol, top
        assert key not in transitions, ('not deterministic', key)
        transitions[key] = dst, operation
    return initial, final, transitions


def pda_table(number, index, initial, final, t_values):
    transitions = {}
    for states, symbol, tops, operation, dst in tables(number)[index]:
        for state in states.split(' או '):
            for top in (t_values if tops == 'T' else [tops]):
                op = operation
                if op == 'דחוף יחידה':
                    op = ('S' if top == '⊥' else 'A') + ' דחוף'
                elif op.startswith('דחוף '):
                    op = op.split()[1] + ' דחוף'
                elif op.startswith('שלוף '):
                    op = op.split()[1] + ' שלוף'
                key = state, symbol, top
                assert symbol != 'ε' and key not in transitions
                transitions[key] = dst, op
    return initial, set(final), transitions


def pda_run(model, word):
    state, final, transitions = model
    stack = ['⊥']
    for symbol in word:
        move = transitions.get((state, symbol, stack[-1]))
        if move is None:
            return False
        state, op = move
        if op.endswith(' דחוף'):
            stack.append(op.split()[0])
        elif op.endswith(' שלוף'):
            assert stack[-1] == op.split()[0] and len(stack) > 1
            stack.pop()
        else:
            assert op == 'ללא שינוי', op
    return state in final


def balanced(word):
    balance = 0
    for symbol in word:
        balance += 1 if symbol == '(' else -1
        if balance < 0:
            return False
    return balance == 0


def tm_diagram(number, index):
    initial, final, edges = diagram(number, index)
    transitions = {}
    for src, dst, label in edges:
        read_write, direction = label.replace('#36;', '$').split(', ')
        read, write = read_write.split('/')
        key = src, read
        assert key not in transitions
        transitions[key] = dst, write, direction
    return initial, final, transitions


def tm_table():
    transitions = {}
    for src, symbols, write, direction, dst in tables(14)[0]:
        for read in symbols.split(','):
            key = src, read
            assert key not in transitions
            transitions[key] = dst, read if write == 'אותו סימן' else write, direction
    return 'E', {'halt'}, transitions


def tm_run(model, word, sentinel=False):
    state, final, transitions = model
    tape = dict(enumerate(word))
    if sentinel:
        tape[-1] = '⊢'
    head = 0
    for steps in range(200000):
        if state in final:
            return tape, head, steps
        move = transitions.get((state, tape.get(head, 'Δ')))
        assert move is not None, ('stuck TM', word, state, head, tape)
        state, written, direction = move
        assert written != 'ε' and direction in ('L', 'R')
        tape[head] = written
        head += 1 if direction == 'R' else -1
        if sentinel:
            assert head >= -1, 'TM crossed left boundary'
    raise AssertionError(('TM step bound exceeded', word))


def output_value(tape):
    marks = sorted(k for k, value in tape.items() if value == '$')
    assert len(marks) == 2, ('output delimiters', tape)
    left, right = marks
    assert all(tape.get(i) == '1' for i in range(left + 1, right))
    return right - left - 1


def check():
    models = [
        ('ends 1', fa_diagram(2), '01', 9, lambda w: w.endswith('1')),
        ('same final pair', fa_table(2, 2, ['a','b'], 'q0', ['q2','q4']), 'ab', 9,
         lambda w: w.endswith(('aa','bb'))),
        ('prefix 01 / suffix 10', fa_diagram(3), '012', 8,
         lambda w: w.startswith('01') and w.endswith('10')),
        ('starts 1 / exactly two 2', fa_table(3, 1, ['0','1','2'], 's', ['c2']), '012', 8,
         lambda w: w.startswith('1') and w.count('2') == 2),
        ('modulo 3 / not ends 2', fa_table(4, 0, ['0,1','2'], '(0,N)', ['(0,N)']), '012', 8,
         lambda w: len(w) % 3 == 0 and not w.endswith('2')),
        ('prefix 11 / even / ends 1', fa_table(4, 1, ['1','0,2'], 's', ['E1']), '012', 8,
         lambda w: w.startswith('11') and w.endswith('1') and len(w) % 2 == 0),
        ('binary numerals', fa_diagram(5), '01.', 8,
         lambda w: re.fullmatch(r'(?:0|1[01]*)(?:\.[01]*1)?', w)),
        ('NFA bbc', fa_diagram(6), 'abc', 8, lambda w: w.endswith('bbc')),
        ('subset DFA bbc', fa_table(6, 1, ['a','b','c'], 'A', ['D']), 'abc', 8,
         lambda w: w.endswith('bbc')),
        ('product even / ends a', fa_table(7, 1, ['a','b'], 'EN', ['EA']), 'ab', 9,
         lambda w: len(w) % 2 == 0 and w.endswith('a')),
        ('forbidden patterns', fa_table(7, 2, ['a','b','c'], 's', ['a1']), 'abc', 8,
         lambda w: 'aa' not in w and 'aba' not in w and w.endswith('a')),
        ('fixed-state assignment 2', fa_table(9, 0, ['a','b'], 'q0', ['q2','q3','q5','q6']), 'ab', 10,
         lambda w: not w.startswith('ab') and (('aa' in w) != ('bb' in w))),
    ]
    for name, model, alphabet, length, predicate in models:
        exhaustive(name, alphabet, length, lambda w, m=model: fa_run(m,w), predicate)

    pda_cases = [
        ('equal blocks PDA', pda_diagram(10), 'ab', 10,
         lambda w: re.fullmatch(r'a*b*', w) and w.count('a') == w.count('b')),
        ('balanced parentheses PDA', pda_table(10, 2, 'e', ['e'], []), '()', 10, balanced),
        ('3k+1 PDA', pda_diagram(11), 'abc', 9,
         lambda w: re.fullmatch(r'a+b+c+',w) and w.count('b') == 3*w.count('c')+1),
        ('strict inequality PDA', pda_table(11, 0, 'E', ['F'], ['⊥','S','A']), 'abc', 9,
         lambda w: re.fullmatch(r'a*b*c+',w) and w.count('a') % 2 == 0
         and w.count('c') > w.count('a')//2+w.count('b')),
        ('first/last blocks PDA', pda_table(11, 2, 's', ['F'], ['S','A']), 'abc', 9,
         lambda w: (m:=re.fullmatch(r'(a+)(?:ba+)*c(a+)',w)) and len(m[1]) == len(m[2])),
        ('positive difference PDA', pda_table(12, 0, 'Z', ['P'], ['S','A']), 'ab', 11,
         lambda w: w.count('a') > w.count('b')),
    ]
    for name, model, alphabet, length, predicate in pda_cases:
        exhaustive(name, alphabet, length, lambda w,m=model: pda_run(m,w), predicate)

    flip = tm_diagram(13,0)
    for size in range(9):
        for chars in product('01',repeat=size):
            word = ''.join(chars)
            tape, head, steps = tm_run(flip,word)
            assert ''.join(tape[i] for i in range(size)) == word.translate(str.maketrans('01','10'))
            assert head == size+1 and steps == size+1
    print('PASS bit inversion TM: 511 inputs, exact head positions and step counts')

    mod = tm_diagram(13,1)
    assert ('q0','Δ') not in mod[2], 'Original assignment intentionally has no zero case'
    assert r'\delta(q0,\Delta)=(q4,\$,R)' in source(13)
    mod[2]['q0','Δ'] = ('q4','$','R')
    for n in range(81):
        tape, head, steps = tm_run(mod,'1'*n)
        assert output_value(tape) == n % 3 and steps <= n+4
    print('PASS remainder TM: unary 0..80, including documented zero extension')

    parity = tm_table()
    for n in range(2,81):
        tape, head, steps = tm_run(parity,'1'*n,True)
        assert output_value(tape) == (n//2 if n % 2 == 0 else n-1), (n,tape)
        assert tape[-1] == '⊢'
    print('PASS parity transducer: unary 2..80, termination, delimiters and contiguous output')
    print(f'PASS total finite-automaton/PDA comparisons: {COUNT:,}')


if __name__ == '__main__':
    check()
