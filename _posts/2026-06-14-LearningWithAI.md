---
layout: post
title: "Teaching Students to Learn with AI Without Becoming Dependent on It"
subtitle: "What Aviation's Autopilot Problem Can Teach Us About AI, Skill Atrophy, and Human Learning"
tags: [AI, Education, Learning, Teaching, Automation, Human-Factors, Codex, Cursor, Claude-Code, Skill-Development]
author: https://habr.com/ru/users/python_leader/
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<div markdown="1" class="box-note">
How AI Can Make Us Better — or Make Us Forget How to Think

Boeing has been tracking aviation accidents since the 1950s. One statistic has remained remarkably stable for decades: roughly **80% of aviation accidents are attributed primarily to human factors**.

At the same time, aircraft have become dramatically more reliable, and autopilot systems have become dramatically more capable.

The paradox is that these two facts are connected.

</div>

## How AI Can Make Us Better — or Make Us Forget How to Think

### Automation-Induced Complacency

Aviation has a term for this phenomenon: **automation-induced complacency**.

It describes a situation where a system becomes reliable enough that operators stop actively monitoring it.

The human brain is not designed to sustain focused attention indefinitely without feedback. When nothing significant happens for a long period of time, concentration naturally declines. This is a physiological reality, not laziness.

In aviation accident reports, it looks like this:

On June 1, 2009, over the Atlantic Ocean at night, the pitot tubes on Air France Flight 447 iced over. The airspeed indicators began displaying incorrect data, and the autopilot disconnected.

The two pilots in the cockpit lacked adequate training for manually flying a commercial aircraft at high altitude. Their actions reflected this: instead of lowering the nose, they pulled it up.

The aircraft entered an aerodynamic stall.

The crew never realized the aircraft was stalled and never performed the recovery actions necessary to exit the stall.

That is essentially the conclusion stated in the final report by the French BEA accident investigation agency.

The incorrect airspeed readings lasted less than one minute of the four-minute descent. The aircraft could have been saved.

**228 people died.**

A system that almost never fails tends to produce operators who are almost never prepared for failure.

---

### Codex, Cursor, Claude Code, and Skill Atrophy

For software developers, the story looks remarkably similar.

Tools such as **Codex**, **Cursor**, and **Claude Code** have already become the equivalent of autopilot for a large portion of developers.

They handle routine tasks:

* Generating functions
* Writing tests
* Explaining unfamiliar code
* Producing SQL queries
* Automating repetitive implementation work

In theory, this frees the developer's mind for more important things.

In practice, that does not always happen.

Most AI coding agents are explicitly designed to operate autonomously. The less intervention required from the developer, the more successful the tool is considered.

Judging by the rapid growth in autonomous-agent usage, many developers are happily embracing that model.

The problem is that the newly freed mental capacity often does not get redirected toward deeper thinking.

Instead, the developer gradually stops exercising the skills that have been delegated to the agent.

Several abilities begin to atrophy:

#### Reading Unfamiliar Code

When an agent explains what every method does, developers get fewer opportunities to practice understanding code independently.

#### Debugging Without Hints

The debugger is either never opened or is opened solely to gather output that can be pasted into an AI agent.

The crucial step of asking:

> "What could actually be going wrong here?"

starts to disappear.

#### Understanding Compiler Errors

Compiler diagnostics increasingly get pasted directly into an AI tool without even being read to the end.

---

### The Unique Challenge of AI-Generated Code

Aviation has one important advantage.

When a system fails, the failure is often visible through instruments or through the aircraft's behavior.

Developers working with AI agents have far fewer warning indicators.

A compiler will certainly catch syntax errors.

It will not reliably catch logical flaws in generated code.

AI writes with confidence regardless of whether it is correct.

Generated code looks convincing right up until the moment it stops working.

The problem is not that AI makes mistakes frequently.

The problem is that it makes mistakes **infrequently enough** that developers stop looking for them.

A developer who fully delegates implementation work to an AI agent gradually loses the ability to recognize those rare failures.

If a model is wrong only 1% of the time, but you generate 200 code fragments per day, you will still encounter bugs every single day.

---

### Developers Without Flight Hours

Pilots are required to maintain a minimum amount of manual flying experience.

There is no widely accepted equivalent requirement for software developers.

A junior developer who begins their career using AI agents from day one skips an important developmental journey.

Traditionally, developers move gradually from:

* Syntax
* To problem solving
* To design
* To architecture

With AI, they can immediately produce working results without necessarily understanding why the solution works.

Working software is valuable.

Lack of understanding is not immediately visible.

The problem emerges later, when the agent produces something that does not work and the developer must determine why.

---

### So What Should We Do?

This is not an anti-AI manifesto.

Rejecting AI would be as unreasonable as rejecting autopilot systems in aviation.

Autopilot saves lives.

No one is suggesting otherwise.

However, pilots continue to fly manually on a regular basis—not because autopilot is unreliable, but because **autopilot reliability is not the same thing as pilot reliability**.

The same principle applies to software development.

Developers need regular practice without the autopilot.

That might mean:

* Debugging problems independently before asking an agent for help
* Performing code reviews before requesting an AI explanation
* Occasionally implementing small features from scratch
* Reading unfamiliar code without AI assistance
* Investigating compiler errors personally before delegating them

The intervals should not be long.

Research on **automation bias** suggests that degradation of manual skills begins sooner than intuition would predict and accelerates over time when highly reliable automation is consistently available.

---

# Teaching Students to Learn With AI Without Becoming Dependent on It

The lesson for education is not that AI should be banned.

The lesson is that students must continue exercising the cognitive skills that AI can easily replace.

If AI always explains, students stop learning how to analyze.

If AI always debugs, students stop learning how to investigate.

If AI always writes, students stop learning how to construct solutions.

The goal is not to prevent students from using AI.

The goal is to ensure they remain capable of functioning when AI is unavailable—or when AI is wrong.

A healthy learning model resembles pilot training:

* Use AI frequently.
* Learn from AI actively.
* Verify AI critically.
* Practice without AI regularly.

Students should sometimes solve problems entirely on their own, not because AI is ineffective, but because human capability deteriorates when it is never exercised.

The purpose of education is not merely producing correct answers.

It is producing people who understand why those answers are correct.

And that requires keeping the human pilot in the cockpit.
