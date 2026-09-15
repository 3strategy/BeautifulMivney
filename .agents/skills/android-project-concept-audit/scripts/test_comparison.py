"""Behavior tests with disposable fixtures; no Android project modifications."""
import os
from pathlib import Path
import tempfile
import unittest

from compare_android_projects import inventory, markdown, mask_source, normalized, run_concepts, summarize, test_signature


class ComparisonTests(unittest.TestCase):
    def test_comments_literals_and_offsets(self):
        source = '/* if\nwhile */\nString s = "https://x/if?"; // if\nif (ok) run();\n'
        masked = mask_source(source, strings=True)
        self.assertEqual(len(masked), len(source))
        self.assertEqual(masked.count('\n'), source.count('\n'))
        self.assertEqual(masked.count('if'), 1)
        self.assertIn('https://x/if?', mask_source(source))

    def test_multiline_string_is_not_a_comment(self):
        source = 'String s = """\n// not a comment\n/* literal */\n""";\n'
        self.assertIn('// not a comment', mask_source(source))
        self.assertNotIn('literal', mask_source(source, strings=True))

    def test_normalized_templates_preserve_literal_semantics(self):
        a = 'package com.example.a; class C { String s = "a b"; }'
        b = 'package com.example.b;\nclass C{String s="a b";} // note'
        self.assertEqual(normalized(a, 'com.example.a', '.java'), normalized(b, 'com.example.b', '.java'))
        self.assertNotEqual(normalized(a, '', '.java'), normalized(a.replace('a b', 'ab'), '', '.java'))

    def test_context_smoke_test_vs_meaningful_test(self):
        a = 'class T { @Test void useAppContext(){ assertEquals("com.old", appContext.getPackageName()); } }'
        b = a.replace('com.old', 'com.new')
        self.assertEqual(test_signature(a, '', '.java'), test_signature(b, '', '.java'))
        self.assertNotEqual(test_signature(a, '', '.java'),
                            test_signature(a.replace('} }', 'assertTrue(game.isWon()); } }'), '', '.java'))

    def test_inventory_exclusions_line_evidence_and_delta(self):
        # Prefer an explicitly allowed temp root on the desktop; normal OS temp elsewhere.
        base = Path('C:/Temp') if os.name == 'nt' else None
        if base: base.mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(prefix='android-audit-test-', dir=base) as tmp:
            root = Path(tmp)
            for name in ('baseline', 'student'):
                p = root / name
                (p / 'app/src/main/java').mkdir(parents=True)
                (p / 'settings.gradle').write_text('include(":app")\n')
                (p / 'app/src/main/java/App.java').write_text(
                    'package example;\n\nimport android.os.Handler;\n// comment\nclass App {\n'
                    '  Handler work = new Handler();\n}\n')
            b = inventory(root / 'baseline')
            summarize(b, b)
            p = root / 'student'
            for folder in ('app/build', 'generated', '.idea', 'node_modules'):
                (p / folder).mkdir(parents=True)
                (p / folder / 'Ignored.java').write_text('class Wrong {}\n')
            (p / 'google-services.json').write_text('{"private":true}\n')
            (p / 'firebase.properties').write_text('token=example\n')
            (p / 'app/src/main/java/Broken.java').write_bytes(b'\xff\xfe\xfd')
            s = inventory(p)
            summarize(s, b)
            self.assertEqual(s['summary']['production_sloc_delta'], 0)
            self.assertEqual(len(s['unreadable']), 1)
            self.assertEqual(s['summary']['production_files'], 1)
            self.assertEqual(s['review_signals']['thread_handler'], ['app/src/main/java/App.java:6'])
            for row in s['files']:
                self.assertLessEqual(row['sloc'], row['nonblank'])
                self.assertLessEqual(row['nonblank'], row['physical'])
            self.assertEqual(s['source_fingerprint'], b['source_fingerprint'])

    def test_zero_baseline_ratio_is_reported_without_crash(self):
        b = {'name': 'empty', 'files': [], 'root': 'empty', 'source_fingerprint': '0', 'unreadable': []}
        summarize(b, b)
        p = {'name': 'student', 'files': [], 'root': 'student', 'source_fingerprint': '0', 'unreadable': []}
        summarize(p, b)
        self.assertIsNone(p['summary']['production_sloc_ratio'])
        self.assertIn('undefined', markdown({'baseline': b, 'projects': [p]}))

    @unittest.skipUnless(os.name == 'nt', 'Legacy scanner requires Windows PowerShell')
    def test_legacy_persistable_permission_and_dialog_fragment(self):
        with tempfile.TemporaryDirectory(prefix='android-concept-test-', dir='C:/Temp') as tmp:
            root = Path(tmp)
            (root / 'settings.gradle').write_text('include(":app")\n')
            (root / 'Dialog.java').write_text(
                'class Dialog extends androidx.fragment.app.DialogFragment {}\n'
                '// Take persistable permission; this is not a Requery ORM.\n')
            rows = run_concepts({'root': str(root)}, Path(__file__).with_name('Invoke-AndroidConceptAudit.ps1'))
            statuses = {r['Id']: r['Status'] for r in rows}
            self.assertEqual(statuses['fragments'], 'Present')
            self.assertEqual(statuses['requery'], 'Not detected')


if __name__ == '__main__':
    unittest.main()
