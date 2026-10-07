insert into public.site_settings (key, value) values ('profile', '{"name":"Sifat Hasan","fullName":"Tawhid Hassan Sifat","initials":"SH","roles":["Senior Flutter Developer","Software Engineer","Cross-Platform App Architect","AI Integration Specialist"],"tagline":"Senior Flutter Developer & Software Engineer","location":"Dhaka, Bangladesh","email":"sifat27.sh22@gmail.com","phone":"+8801781788268","availability":"Available for select projects","experienceYears":"5+","shortBio":"Senior Flutter Developer with 5+ years crafting high-performance, beautifully designed mobile apps — blending innovation, scalability, and precision in every line of code.","photoUrl":"/sifat.png","cvUrl":"/TawhidHasanSifat_5_plus_experience_2026.pdf","heroBadges":["Flutter","5+ yrs","20+ apps","Android · iOS"]}'::jsonb) on conflict (key) do nothing;

insert into public.site_settings (key, value) values ('about', '{"heading":"Engineering mobile products that scale.","paragraphs":["I''m a Senior Flutter Developer with 5+ years of experience building production-grade mobile applications for enterprises, fintechs, and high-growth startups across Bangladesh and beyond.","My focus is on shipping cross-platform apps for Android and iOS that feel native, perform flawlessly, and scale gracefully — backed by clean architecture, robust state management, and thoughtful API design.","From HR platforms and sales-force automation for Samsung and Unilever, to fintech and edtech products serving thousands of users, I bring a product-building mindset: I care about the business outcome, not just the code."]}'::jsonb) on conflict (key) do nothing;

insert into public.site_settings (key, value) values ('headings', '{"experience":{"eyebrow":"Career Path","title":"A timeline of building & shipping.","description":"Five-plus years across fintech, HR, ecommerce, edtech, and enterprise automation — leading teams and owning delivery."},"clients":{"eyebrow":"Trusted By","title":"Brands I''ve worked for.","description":"From multinationals to fast-moving local teams — products and platforms shipped for organizations across industries."},"skills":{"eyebrow":"Capabilities","title":"A toolkit honed in production.","description":"From pixel-perfect Flutter UI to resilient backends and AI integrations — the full stack of shipping mobile products. Tap a node to explore each domain."},"projects":{"eyebrow":"Featured Work","title":"Products shipped to real users.","description":"Enterprise platforms, fintech apps, and consumer products live on the Play Store — built end-to-end with Flutter."},"achievements":{"eyebrow":"Impact","title":"Proven across scale & industries.","description":"A track record of shipping reliable products and leading teams from startups to enterprise."},"testimonials":{"eyebrow":"Testimonials","title":"Trusted by people who ship.","description":"Words from engineering leaders and peers I''ve built alongside."},"global":{"eyebrow":"Global Reach","title":"Working across borders.","description":"Remote-first collaboration with teams and clients on five markets across three continents. Hover a pin to see where."},"contact":{"eyebrow":"Get in Touch","title":"Let''s build something exceptional.","description":"Have a product in mind or a team to strengthen? I''m open to senior Flutter roles, consulting, and ambitious builds."}}'::jsonb) on conflict (key) do nothing;

insert into public.site_settings (key, value) values ('skills', '{"marquee":["Flutter","Dart","Firebase","Node.js","REST APIs","GetX","Clean Architecture","State Management","AI Integration","Payment Integration","Background Services","Push Notifications","Maps","Location Tracking","CI/CD","Git","UI/UX","Performance"]}'::jsonb) on conflict (key) do nothing;

insert into public.site_settings (key, value) values ('seo', '{"title":"Sifat Hasan — Senior Flutter Developer & Software Engineer","description":"Senior Flutter Developer with 5+ years building high-performance, cross-platform mobile apps for fintech, HR, ecommerce, and enterprise clients including Samsung, Unilever & Abul Khair.","url":"https://tawhidhassan.github.io","keywords":["Sifat Hasan","Tawhid Hassan Sifat","Flutter Developer","Senior Flutter Developer","Software Engineer","Mobile App Developer","Dart Developer","Cross-Platform Developer","Bangladesh Flutter Developer"]}'::jsonb) on conflict (key) do nothing;

insert into public.socials (sort_order, label, href, handle, icon)
select * from (values
  (0, 'GitHub', 'https://github.com/TawhidHassan', '@TawhidHassan', 'Github'),
  (1, 'LinkedIn', 'https://www.linkedin.com/in/tawhid-hasan-sifat-40093320a/', 'Tawhid Hassan Sifat', 'Linkedin'),
  (2, 'Email', 'mailto:sifat27.sh22@gmail.com', 'sifat27.sh22@gmail.com', 'Mail'),
  (3, 'Phone', 'tel:+8801781788268', '+8801781788268', 'Phone')
) as v
where not exists (select 1 from public.socials);

insert into public.about_highlights (sort_order, title, description, icon)
select * from (values
  (0, 'Cross-Platform Mastery', 'Flutter & Dart specialist delivering pixel-perfect, native-feeling apps on Android and iOS from a single codebase.', 'Smartphone'),
  (1, 'Scalable Architecture', 'Clean Architecture, GetX, and modular state management that keep large codebases maintainable as teams grow.', 'Boxes'),
  (2, 'AI & Backend Integration', 'Wiring intelligent features and resilient REST/Node.js & Laravel backends into seamless product experiences.', 'Cpu'),
  (3, 'Fintech-Grade Quality', 'Payment integrations, secure flows, and enterprise reliability honed across financial and HR platforms.', 'CreditCard')
) as v
where not exists (select 1 from public.about_highlights);

insert into public.education (sort_order, degree, institution, period, result)
select * from (values
  (0, 'BSc in Computer Science & Engineering', 'European University of Bangladesh', '2017 — 2021', 'CGPA 3.85'),
  (1, 'Higher Secondary Certificate (HSC)', 'Shaikh Burhanuddin Post Graduate College', '2015 — 2017', 'GPA 4.22')
) as v
where not exists (select 1 from public.education);

insert into public.experiences (sort_order, company, role, period, type, icon, summary, projects)
select * from (values
  (0, 'Upscale BD', 'Senior Software Engineer', '2024 — Present', 'Full-time', 'Rocket', 'Leading development of enterprise HR and attendance solutions, owning architecture and delivery end-to-end.', array['Digigo — complete HR solution', 'Attendx — attendance management for ActionAid']::text[]),
  (1, 'Market Access Analytics & Consulting (MAAC)', 'Software Engineer', '2021 — 2024', 'Full-time', 'Building2', 'Built sales-force automation, activation, and edtech platforms for some of the largest enterprises in the region.', array['Salesx — sales automation for Samsung Bangladesh', 'Fieldx — sales & field management for Abul Khair Group', 'Pmx — activation management for Unilever', 'Shomriddhi — edtech platform', 'Hrx — HR solution']::text[]),
  (2, 'Invariant Telecom Bangladesh Ltd.', 'Software Engineer', '2021', 'Full-time', 'Briefcase', 'Developed sub-wing management software supporting telecom operations and internal workflows.', array['Dhamaka sub-wings software']::text[]),
  (3, 'Biddabari', 'Lead App Engineer · Senior Software Engineer', 'Part-time', 'Part-time', 'GraduationCap', 'Led the app team for a popular edtech product, mentoring engineers and owning the mobile roadmap.', array['Biddabari App — edtech platform']::text[]),
  (4, 'Twentyfive Pvt. Ltd.', 'Team Lead · Senior Software Engineer', 'Part-time', 'Part-time', 'Layers', 'Led delivery of on-demand hiring products connecting employers and job seekers instantly.', array['InstaHire — instantly find an employee', 'InstaJob — find an instant job']::text[]),
  (5, 'Freelance — Fiverr & Local Clients', 'Software Engineer', '2019 — 2020', 'Freelance', 'ShoppingBag', 'Delivered ecommerce and custom mobile solutions for international and local clients.', array['Regal Furniture', 'Multiple ecommerce projects']::text[])
) as v
where not exists (select 1 from public.experiences);

insert into public.skill_groups (sort_order, category, skills)
select * from (values
  (0, 'Core Mobile', '[{"name":"Flutter","level":96,"icon":"Smartphone"},{"name":"Dart","level":95,"icon":"Cpu"},{"name":"State Management","level":92,"icon":"Workflow"},{"name":"GetX","level":93,"icon":"Boxes"},{"name":"Clean Architecture","level":90,"icon":"Layers"},{"name":"Performance Optimization","level":88,"icon":"Gauge"}]'::jsonb),
  (1, 'Backend & Data', '[{"name":"Node.js","level":85,"icon":"Server"},{"name":"Laravel","level":80,"icon":"Server"},{"name":"Firebase","level":90,"icon":"Cloud"},{"name":"MongoDB","level":82,"icon":"Database"},{"name":"REST APIs","level":92,"icon":"Globe"},{"name":"Background Services","level":86,"icon":"Workflow"}]'::jsonb),
  (2, 'Product & Platform', '[{"name":"AI Integration","level":84,"icon":"Brain"},{"name":"Payment Integration","level":88,"icon":"CreditCard"},{"name":"Push Notifications","level":90,"icon":"Bell"},{"name":"Maps & Geofencing","level":87,"icon":"Map"},{"name":"Location Tracking","level":88,"icon":"Locate"},{"name":"CI/CD","level":80,"icon":"GitBranch"}]'::jsonb),
  (3, 'Craft & Delivery', '[{"name":"UI / UX","level":88,"icon":"Palette"},{"name":"Git","level":92,"icon":"GitBranch"},{"name":"Android & iOS","level":93,"icon":"Smartphone"},{"name":"Security","level":84,"icon":"ShieldCheck"}]'::jsonb)
) as v
where not exists (select 1 from public.skill_groups);

insert into public.projects (sort_order, name, category, description, long_description, play_store, tech, metrics, accent)
select * from (values
  (0, 'Hrx', 'Enterprise · HR', 'Enterprise HR platform with attendance, employee management, workflows, and automation.', 'A complete HR management suite handling attendance tracking, employee lifecycle, approval workflows, and process automation for large organizations.', 'https://play.google.com/store/apps/details?id=com.hrx.hrx&hl=en', array['Flutter', 'GetX', 'REST APIs', 'Firebase', 'Clean Architecture']::text[], '[{"label":"Modules","value":"12+"},{"label":"Platform","value":"Android · iOS"},{"label":"Scale","value":"Enterprise"}]'::jsonb, 'from-blue-500 via-indigo-500 to-purple-500'),
  (1, 'DigiGO', 'Enterprise · HR', 'Next-gen HR management app that simplifies how you manage people and processes.', 'DigiGO is a next-gen HR management app designed to simplify how you manage people and processes. Whether you''re running a small team or a growing business, DigiGO puts all essential HR tools in one place.', 'https://play.google.com/store/apps/details?id=xyz.sheba.emanager&hl=en', array['Flutter', 'REST APIs', 'Firebase', 'Clean Architecture']::text[], '[{"label":"Tools","value":"All-in-one"},{"label":"Platform","value":"Android · iOS"},{"label":"Scale","value":"SMB → Enterprise"}]'::jsonb, 'from-indigo-500 via-blue-500 to-cyan-500'),
  (2, 'Regal Ecommerce', 'Ecommerce · Retail', 'Large-scale ecommerce application delivering a modern, fluid shopping experience.', 'A full-featured ecommerce platform with rich product browsing, cart and checkout flows, payment integration, and order tracking built for scale.', 'https://play.google.com/store/apps/details?id=com.rfl.regal', array['Flutter', 'Payment Integration', 'REST APIs', 'State Management']::text[], '[{"label":"Checkout","value":"Optimized"},{"label":"Payments","value":"Integrated"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-cyan-500 via-sky-500 to-blue-500'),
  (3, 'Biddabari LMS', 'EdTech · Learning', 'Learning management platform with video lessons, course management, and education tools.', 'An end-to-end learning management system featuring streaming video lessons, structured courses, live classes, and progress tracking for thousands of students.', 'https://play.google.com/store/apps/details?id=com.nextive.biddabari2021', array['Flutter', 'Video Streaming', 'Firebase', 'Push Notifications']::text[], '[{"label":"Content","value":"Video + Live"},{"label":"Users","value":"Thousands"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-violet-500 via-purple-500 to-fuchsia-500'),
  (4, 'Tahweel Fintech', 'Fintech · Payments', 'Financial technology platform with multiple services and scalable architecture.', 'A fintech super-app bundling multiple financial services with secure transaction flows, payment gateways, and a resilient, scalable architecture.', 'https://play.google.com/store/apps/details?id=tahweel.io', array['Flutter', 'Payment Integration', 'Security', 'Clean Architecture']::text[], '[{"label":"Services","value":"Multi"},{"label":"Security","value":"Grade A"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-emerald-500 via-teal-500 to-cyan-500'),
  (5, 'FieldX Sales Automation', 'Enterprise · SFA', 'Sales-force automation system with enterprise features for field teams.', 'A sales-force automation platform for enterprise field teams — order capture, route planning, location tracking, and real-time reporting for brands like Samsung & Abul Khair.', 'https://play.google.com/store/apps/details?id=com.fieldx.fieldx', array['Flutter', 'Maps', 'Location Tracking', 'Background Services']::text[], '[{"label":"Clients","value":"Samsung+"},{"label":"Tracking","value":"Real-time"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-orange-500 via-amber-500 to-yellow-500'),
  (6, 'Activation Automation', 'Enterprise · Automation', 'Enterprise activation and campaign automation solution for large brands.', 'An enterprise automation solution streamlining brand activation campaigns, field execution, and reporting — built for high-volume operational use.', 'https://play.google.com/store/apps/details?id=com.activation.activation', array['Flutter', 'REST APIs', 'Workflows', 'Real-time Sync']::text[], '[{"label":"Workflows","value":"Automated"},{"label":"Ops","value":"High-volume"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-pink-500 via-rose-500 to-red-500'),
  (7, 'InstaJob', 'On-Demand · Jobs', 'Instant job-finding app connecting job seekers with nearby work in real time.', 'A real-time job marketplace that matches job seekers with instant work opportunities nearby — live listings, in-app applications, notifications, and location-aware matching.', 'https://play.google.com/store/apps/details?id=com.app.insta_employee&hl=en', array['Flutter', 'Firebase', 'Push Notifications', 'Maps', 'Location Tracking']::text[], '[{"label":"Matching","value":"Real-time"},{"label":"Listings","value":"Live"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-sky-500 via-blue-500 to-indigo-500'),
  (8, 'InstaJob Client', 'On-Demand · Hiring', 'Instant employee-finding app letting employers hire nearby workers on demand.', 'The employer side of the InstaJob platform — post jobs, discover available workers nearby, and hire instantly with real-time matching, in-app chat, and notifications.', 'https://play.google.com/store/apps/details?id=com.aamarpa.user&hl=en', array['Flutter', 'Firebase', 'Push Notifications', 'Maps', 'REST APIs']::text[], '[{"label":"Hiring","value":"On-demand"},{"label":"Matching","value":"Real-time"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-teal-500 via-emerald-500 to-green-500'),
  (9, 'Zahraan', 'Islamic · AI', 'AI-powered Islamic app offering guidance, knowledge, and daily spiritual tools.', 'An AI-driven Islamic companion app delivering authentic guidance, Q&A, and daily spiritual tools — Quran, prayer reminders, and intelligent answers powered by AI integration.', 'https://play.google.com/store/apps/details?id=com.zahraan.zahraanAi&hl=en', array['Flutter', 'AI Integration', 'Firebase', 'Push Notifications', 'REST APIs']::text[], '[{"label":"Engine","value":"AI-powered"},{"label":"Focus","value":"Islamic"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-amber-500 via-yellow-500 to-lime-500'),
  (10, 'AttendX', 'Enterprise · Attendance', 'Smart attendance app with face recognition for fast, contactless check-ins.', 'A smart attendance system using face recognition for accurate, contactless check-in and check-out — real-time tracking, location verification, and automated reporting for teams.', 'https://play.google.com/store/apps/details?id=com.actionad.actionad&hl=en', array['Flutter', 'Face Recognition', 'AI Integration', 'Maps', 'REST APIs']::text[], '[{"label":"Auth","value":"Face ID"},{"label":"Check-in","value":"Contactless"},{"label":"Platform","value":"Android · iOS"}]'::jsonb, 'from-fuchsia-500 via-purple-500 to-violet-500')
) as v
where not exists (select 1 from public.projects);

insert into public.stats (sort_order, value, suffix, label)
select * from (values
  (0, '5', '+', 'Years of Experience'),
  (1, '20', '+', 'Production Apps Shipped'),
  (2, '6', '+', 'Enterprise Platforms'),
  (3, '100', 'K+', 'Users Served')
) as v
where not exists (select 1 from public.stats);

insert into public.achievements (sort_order, title, description, icon)
select * from (values
  (0, 'Multiple Production Apps', '20+ apps shipped to Google Play & the App Store across fintech, HR, ecommerce, and edtech.', 'Rocket'),
  (1, 'Large-Scale Deployments', 'Architected apps serving thousands of daily users with reliable, performant experiences.', 'Gauge'),
  (2, 'Enterprise Systems', 'Delivered automation for Samsung, Unilever, Abul Khair, and ActionAid field operations.', 'Building2'),
  (3, 'Fintech Experience', 'Built secure payment flows and multi-service financial platforms to fintech-grade standards.', 'CreditCard'),
  (4, 'Cross-Platform Expertise', 'Single Flutter codebases delivering native-quality apps simultaneously on Android & iOS.', 'Smartphone'),
  (5, 'Team Leadership', 'Led app teams as Senior Engineer & Team Lead, mentoring developers and owning roadmaps.', 'Layers')
) as v
where not exists (select 1 from public.achievements);

insert into public.testimonials (sort_order, name, initials, role, company, meta, email, quote, accent)
select * from (values
  (0, 'Mohsin Khan', 'MK', 'CTO at Jachai', 'ex-iPay', 'Fintech Expert', 'mohsin@upscalebd.com', 'Sifat is one of the most reliable Flutter engineers I''ve worked with — he ships fast, owns delivery end-to-end, and consistently raises the quality bar for the whole team.', 'from-blue-500 to-indigo-500'),
  (1, 'Muhammad Arafat', 'MA', 'Software Engineer', 'Pathao', '', '', 'A sharp problem-solver and a calm presence under pressure. Sifat turns ambiguous requirements into polished, production-ready mobile features.', 'from-violet-500 to-fuchsia-500')
) as v
where not exists (select 1 from public.testimonials);

insert into public.clients (sort_order, name)
select * from (values
  (0, 'Sheba xyz'),
  (1, 'Unilever Bangladesh'),
  (2, 'Samsung Bangladesh'),
  (3, 'Regal Furniture'),
  (4, 'ActionAid'),
  (5, 'Biddabari'),
  (6, 'Twentyfive Pvt. Ltd.'),
  (7, 'Smile Food'),
  (8, 'GCB'),
  (9, 'Invariant Telecom Bangladesh Ltd.'),
  (10, 'Market Access Analytics & Consulting (MAAC)'),
  (11, 'UpscaleBD')
) as v
where not exists (select 1 from public.clients);

insert into public.locations (sort_order, name, flag, lng, lat)
select * from (values
  (0, 'Morocco', '🇲🇦', -6.8498, 33.9716),
  (1, 'United Kingdom', '🇬🇧', -0.1276, 51.5074),
  (2, 'India', '🇮🇳', 77.209, 28.6139),
  (3, 'Bangladesh', '🇧🇩', 90.4125, 23.8103),
  (4, 'United States', '🇺🇸', -77.0369, 38.9072)
) as v
where not exists (select 1 from public.locations);
