# Interaction and navigation polish

The interaction direction follows [Carbon's motion guidance](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview): short, purposeful feedback for routine actions, with coordinated entrance timing. Existing Astryx colors, typography, controls, and easing remain the shared system.

- Course-card hover changes only the footer's neutral surface. The card stays in place, retains its ordinary border, and the title stays unadorned. Keyboard focus keeps a clear outline.
- Brand links use an ordinary navigation link with a three-percent image shrink on press. They have no painted press overlay. This applies to the sidebar wordmark, collapsed G, mobile brand, and library brand.
- The course-request dialog aligns its heading, topic selector, helper, and equal-width actions. It opens an editable email draft; no request is sent automatically or described as submitted. Padding belongs to one content container, avoiding the earlier doubled header inset.
- Library content enters over 420 ms with a small vertical movement and short stagger. Content below the fold enters once when it becomes visible. There is no artificial loading delay. Reduced motion, hash destinations, and restored scroll positions skip the entrance; changing the motion preference settles active animations.
- Sidebar groups use 16-unit separation through the Astryx theme. Rows retain 44-unit targets, with tighter spacing within groups. The same grouping applies in the mobile drawer. More courses links back to the course library.

Verification: production build, TypeScript, all 35 learning/catalog tests (194 assertions), Astryx doctor, and whitespace checks pass. Browser review covers desktop and mobile dialog layouts, email-draft selection, equal action widths, keyboard focus return, neutral hover without a lift/border change, logo press without a background, entrance choreography, reduced motion, and More courses navigation. Existing learner progress is untouched.
