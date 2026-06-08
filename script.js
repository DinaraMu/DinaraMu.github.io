// JavaScript Document

/*

TemplateMo 597 Neural Glass

https://templatemo.com/tm-597-neural-glass

*/

// Mobile menu functionality
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });

        // Enhanced smooth scrolling
        // Uses a custom offset instead of plain scrollIntoView so fixed-header tabs
        // land directly on the section title and highlight immediately.
        function getAnchorOffset() {
            const header = document.querySelector('header');
            const headerHeight = header ? header.getBoundingClientRect().height : 0;
            const isMobile = window.innerWidth <= 640;
            return Math.round(headerHeight + (isMobile ? 14 : 18));
        }

        function setActiveNavByTarget(targetId) {
            document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === targetId);
            });
        }

        function getSectionTitleAnchor(target) {
            return target.querySelector('.section-title, .resume-section-title, .skills-section-title, .contact-info h3') || target;
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const anchorTarget = getSectionTitleAnchor(target);
                    const targetY = anchorTarget.getBoundingClientRect().top + window.pageYOffset - getAnchorOffset();

                    window.scrollTo({
                        top: Math.max(targetY, 0),
                        behavior: 'smooth'
                    });

                    setActiveNavByTarget(targetId);
                    history.replaceState(null, '', targetId);

                    window.setTimeout(updateActiveMenuItem, 260);
                    window.setTimeout(updateActiveMenuItem, 620);
                }
            });
        });

        // Enhanced header functionality
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrolled = window.pageYOffset;
            
            if (scrolled > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Active menu item highlighting
        function updateActiveMenuItem() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
            
            let currentSection = '';
            // Use the actual fixed-header height plus a generous lead so the clicked tab
            // highlights as soon as its section title lands under the nav.
            const scrollPos = window.pageYOffset + getAnchorOffset() + 72;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveMenuItem);
        window.addEventListener('resize', updateActiveMenuItem);
        window.addEventListener('load', updateActiveMenuItem);

        // Parallax effect for geometric shapes
        window.addEventListener('scroll', () => {
            const shapes = document.querySelectorAll('.shape');
            const scrolled = window.pageYOffset;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Neural lines pulse effect
        const neuralLines = document.querySelectorAll('.neural-line');
        setInterval(() => {
            neuralLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'scaleX(1.2)';
                    setTimeout(() => {
                        line.style.opacity = '0.2';
                        line.style.transform = 'scaleX(0.5)';
                    }, 200);
                }, index * 300);
            });
        }, 2000);

        // Enhanced particle generation
        function createQuantumParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = ['#00ffff', '#ff0080', '#8000ff'][Math.floor(Math.random() * 3)];
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100vh';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '-1';
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            document.body.appendChild(particle);
            
            const duration = Math.random() * 3000 + 2000;
            const drift = (Math.random() - 0.5) * 200;
            
            particle.animate([
                { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
                { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 1 }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }

        // Generate quantum particles
        setInterval(createQuantumParticle, 1500);

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe portfolio cards, resume columns, resume items, and old template elements for scroll-in animation
        document.querySelectorAll('.timeline-content, .project-card, .hexagon, .resume-column, .resume-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        // Form submission effect
        // Safe check: this lets you remove the Contact section later without breaking the whole script.
        const submitButton = document.querySelector('.submit-btn');
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                this.innerHTML = 'SENDING...';
                this.style.background = 'linear-gradient(45deg, #8000ff, #00ffff)';
                
                setTimeout(() => {
                    this.innerHTML = 'MESSAGE READY';
                    this.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
                    
                    setTimeout(() => {
                        this.innerHTML = 'SEND MESSAGE';
                        this.style.background = 'linear-gradient(45deg, #00ffff, #ff0080)';
                    }, 2000);
                }, 1500);
            });
        }


/* =========================================
   Custom project showcase replacement
   Edit the portfolioProjects array to swap in
   your real titles, links, images, and videos.
   ========================================= */

function createShowcasePlaceholder(label, startColor, endColor, accentColor, captionLine = '') {
    const safeLabel = String(label || 'Project');
    const safeSubtitle = String(captionLine || '');
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${startColor}" />
                    <stop offset="100%" stop-color="${endColor}" />
                </linearGradient>
                <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.95" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.35" />
                </linearGradient>
            </defs>
            <rect width="1200" height="800" fill="url(#bg)" />
            <circle cx="180" cy="140" r="120" fill="url(#glow)" opacity="0.35" />
            <circle cx="1040" cy="660" r="210" fill="url(#glow)" opacity="0.2" />
            <rect x="88" y="110" width="1024" height="580" rx="34" fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.18)" />
            <rect x="134" y="160" width="420" height="240" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
            <rect x="592" y="160" width="474" height="96" rx="22" fill="rgba(255,255,255,0.08)" />
            <rect x="592" y="280" width="474" height="96" rx="22" fill="rgba(255,255,255,0.08)" />
            <rect x="134" y="440" width="932" height="180" rx="22" fill="rgba(255,255,255,0.08)" />
            <text x="138" y="500" fill="#ffffff" font-size="86" font-family="Inter, Arial, sans-serif" font-weight="800">${safeLabel}</text>
            <text x="142" y="560" fill="rgba(255,255,255,0.8)" font-size="34" font-family="Inter, Arial, sans-serif">${safeSubtitle}</text>
        </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const portfolioProjects = [
{
        // ===== To Boldly Escargot =====
        // 48-hour FIEA Game Jam project. Won 1st Place in 2025.
        // Sorter tags: appears under Game and Art because the work focused on VFX/UI art for a game.
        title: 'To Boldly Escargot',
        eyebrow: '48-hour game jam puzzle adventure',
        year: '2025',
        status: '1st Place FIEA Game Jam',
        team: 'FIEA Game Jam team',
        popupRole: 'VFX and UI Artist',
        teamSize: '4 people',
        categories: ['game', 'art'],
        categoryLabel: 'Game / Art',
        cardRoles: ['VFX Artist', 'UI Artist', 'Game Jam Developer'],
        contributions: [
            'Created VFX and UI art for a 48-hour game jam project.',
            'Supported the playful space-snail visual direction and readable game interface.',
            'Helped the team polish the final build under a tight competition deadline.'
        ],
        madeWith: ['Unity', 'C#', 'VFX', 'UI Art', 'Game Jam'],
        summary: 'A 48-hour award-winning game jam project about a stranded snastronaut exploring a strange Rubik’s Cube-shaped planet.',
        description: 'Oh no! Shellington the Snastronaut has crash-landed on a strange, Rubik’s Cube-shaped planet in the far reaches of Outer Snace. Players click on tiles to move Shellington across the cube’s surface, with each side acting as a different biome full of unique mechanics, helpful paths, and dangerous hazards. Rotate your route, learn each face’s rules, and explore carefully, because one wrong step can flip the whole adventure upside down. This project was made by a team of 4 in 48 hours for the FIEA Game Jam 2025, where it won 1st place. My main role was VFX and UI art.',
        externalLink: { label: 'Play on Itch.io', url: 'https://ruumien.itch.io/to-boldly-escargot' },
        secondaryLink: { label: 'Read FIEA Article', url: 'https://fiea.ucf.edu/news/snail-math-and-squabble-win-third-annual-fiea-collegiate-game-jam/' },
        colors: ['#080d2c', '#6750a4', '#ffffff'],
        cardImage: 'images/portfolio/escargot-title.png',
        gallery: [
            {
                type: 'video',
                src: 'media/escargot-trailer.mp4',
                poster: 'images/portfolio/escargot-title.png',
                alt: 'To Boldly Escargot gameplay trailer',
                caption: 'To Boldly Escargot gameplay trailer. The file is included locally so it can play directly inside the gallery.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-title.png',
                alt: 'To Boldly Escargot title screen',
                caption: 'Title screen for the 48-hour space-snail game jam project.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-gameplay-1.png',
                alt: 'To Boldly Escargot gameplay with a cube planet and multiple biomes',
                caption: 'Gameplay view of the Rubik’s Cube-shaped planet with distinct biome faces.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-gameplay-2.png',
                alt: 'To Boldly Escargot gameplay showing Shellington exploring the cube planet',
                caption: 'Exploring biome tiles and planning movement across the cube surface.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-game-over.png',
                alt: 'To Boldly Escargot game over screen',
                caption: 'Game over screen with the project’s playful space-themed UI style.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-victory.png',
                alt: 'To Boldly Escargot victory screen',
                caption: 'Victory screen after completing the cube route challenge.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-gameplay-3.png',
                alt: 'To Boldly Escargot gameplay showing later cube state and shell list UI',
                caption: 'Gameplay moment showing route planning and the shell collection interface.'
            },
            {
                type: 'image',
                src: 'images/portfolio/escargot-gameplay-4.png',
                alt: 'To Boldly Escargot gameplay with Shellington on cube biomes',
                caption: 'A gameplay state showing biome changes, hazards, and traversal choices.'
            }
        ]
    },
{
        // ===== ETERNIA =====
        // Senior Project / solo development project.
        // Edit categories/categoryLabel below to control which sorter buttons show this project.
        title: 'ETERNIA',
        eyebrow: 'Fast-paced roguelike dungeon crawler',
        year: '2025',
        status: 'Senior Project',
        team: 'Solo development',
        popupRole: 'Solo Developer',
        teamSize: '1 person',
        categories: ['game'],
        categoryLabel: 'Game',
        cardRoles: ['Solo Developer', 'Game Designer', 'Developer'],
        contributions: [
            'Designed and built a fast-paced roguelike dungeon crawler as a solo senior project.',
            'Created replayable dungeon combat with upgrades, enemies, and shifting run layouts.',
            'Built the world concept around a fallen machine empire and a lone scout robot.'
        ],
        madeWith: ['Unity', 'C#', 'Game Design', 'Solo Dev'],
        summary: 'A fast-paced roguelike dungeon crawler set in the shattered remains of a once-great machine empire.',
        description: 'ETERNIA is a fast-paced roguelike dungeon crawler set in the shattered remains of a once-great machine empire. You play as a lone scout robot, reactivated centuries after the fall, with only a faint signal guiding you through the ruins. Explore shifting dungeon layouts filled with rusted machinery, hidden upgrades, and towering abandoned war machines that now guard the ruins. Adapt your strategies with each run — no two journeys through Eternia are the same. Uncover fragments of the past, upgrade your abilities, and fight for survival in a world where even broken machines still have teeth. This was developed as a senior project through solo development by Dinara Mukhtarova.',
        externalLink: { label: 'Play on Itch.io', url: 'https://ruumien.itch.io/eternia' },
        secondaryLink: { label: 'Watch Trailer', url: 'https://www.youtube.com/watch?v=hZn7wAwDI4k' },
        colors: ['#0b2438', '#0f8fa8', '#7ff6ff'],
        cardImage: 'images/portfolio/eternia-cover.png',
        gallery: [
            {
                type: 'video',
                src: 'media/eternia-game-trailer.mp4',
                poster: 'images/portfolio/eternia-cover.png',
                alt: 'ETERNIA gameplay trailer',
                caption: 'ETERNIA gameplay trailer. The file is included locally so it can play directly inside the gallery.'
            },
            {
                type: 'image',
                src: 'images/portfolio/eternia-cover.png',
                alt: 'ETERNIA cover art with scout robot under a starry sky',
                caption: 'ETERNIA cover art and title image.'
            },
            {
                type: 'image',
                src: 'images/portfolio/eternia-gameplay-1.png',
                alt: 'ETERNIA gameplay screenshot showing dungeon combat',
                caption: 'Combat encounter inside the machine ruins.'
            },
            {
                type: 'image',
                src: 'images/portfolio/eternia-gameplay-2.png',
                alt: 'ETERNIA gameplay screenshot showing a scout robot fighting an enemy',
                caption: 'Fast-paced combat with enemy machines and arena hazards.'
            },
            {
                type: 'image',
                src: 'images/portfolio/eternia-gameplay-3.png',
                alt: 'ETERNIA gameplay screenshot showing ruined arena environment',
                caption: 'Dungeon layout with broken machinery, glowing pickups, and environmental cover.'
            },
            {
                type: 'image',
                src: 'images/portfolio/eternia-gameplay-4.png',
                alt: 'ETERNIA gameplay screenshot showing combat with game over text',
                caption: 'Gameplay challenge and failure state during a dungeon run.'
            },
            {
                type: 'image',
                src: 'images/portfolio/eternia-gameplay-5.png',
                alt: 'ETERNIA gameplay screenshot showing boss combat in machine ruins',
                caption: 'Combat-focused gameplay against abandoned war machines.'
            }
        ]
    },
{
        // ===== LilyPad =====
        // UX/UI design + web documentation project.
        // Sorter tags: appears under UX/UI and Web because it includes UX/UI design and web development.
        title: 'LilyPad',
        eyebrow: 'UX/UI design and mobile app concept',
        year: '2023',
        status: 'Personal Project',
        team: 'Personal project team',
        popupRole: 'UX/UI Designer / Web Developer',
        teamSize: '5 people',
        categories: ['uxui', 'web'],
        categoryLabel: 'UX/UI / Web',
        cardRoles: ['UX/UI Designer', 'Web Developer', 'Visual Designer'],
        contributions: [
            'Designed mobile app screens, user flows, and visual direction in Figma.',
            'Created a social art app concept focused on challenges, doodles, and community sharing.',
            'Built web documentation to present the project goals, process, and final design.'
        ],
        madeWith: ['Figma', 'UX/UI', 'Web Design'],
        summary: 'A UX/UI and web development project for an art-focused social app that helps young artists connect, share work, and stay inspired.',
        description: 'LilyPad is a mobile app concept designed to help young artists and students connect with creative communities, share their work, and participate in low-stakes art challenges. The project combines UX/UI design, visual identity, and web documentation to create a friendly digital space for doodle sharing, daily prompts, profile customization, and community engagement. The core goal was to make art feel more accessible, social, and fun for college-aged creatives while reducing the loneliness often felt in online and campus communities.',
        externalLink: { label: 'Project Website', url: 'https://ancent0713.wixsite.com/lilypad' },
        secondaryLink: { label: 'View Figma', url: 'https://www.figma.com/design/9AnNzOGwrb9dRi3WsRy9t0/LilyPad-Wireframe?node-id=391-208&t=HFArEQq5WOarj0Wn-1' },
        colors: ['#fdebf2', '#f5a7cf', '#b9d8c8'],
        cardImage: 'images/portfolio/lilypad-cover.png',
        gallery: [
            {
                type: 'image',
                src: 'images/portfolio/lilypad-cover.png',
                alt: 'LilyPad project title and logo graphic',
                caption: 'LilyPad title and brand direction for the UX/UI mobile app project.'
            },
            {
                type: 'image',
                src: 'images/portfolio/lilypad-wireframes.png',
                alt: 'LilyPad mobile app wireframe screens',
                caption: 'High-level wireframe screens showing the app structure, core pages, and user flow.'
            },
            {
                type: 'image',
                src: 'images/portfolio/lilypad-screens-1.png',
                alt: 'LilyPad app screens for canvas, messages, friend list, and rewards',
                caption: 'Interface screens for art creation, messaging, friends, and rewards.'
            },
            {
                type: 'image',
                src: 'images/portfolio/lilypad-screens-2.png',
                alt: 'LilyPad app screens for dashboard, post, challenges, and new post',
                caption: 'Community, posting, and challenge screens focused on low-stakes art sharing.'
            },
            {
                type: 'image',
                src: 'images/portfolio/lilypad-concept-art.png',
                alt: 'LilyPad concept art showing hand-drawn mobile app layout ideas',
                caption: 'Early concept art and layout sketches for the LilyPad mobile experience.'
            }
        ]
    },

{
        // ===== Dino Luzzi Website Redesign =====
        // UX/UI + web design project.
        // Sorter tags: appears under UX/UI and Web.
        title: 'Dino Luzzi Website Redesign',
        eyebrow: 'UX/UI and web design',
        year: '2023',
        status: 'Website Redesign',
        team: 'Team project',
        popupRole: 'UX/UI Designer / Web Designer',
        teamSize: '3 people',
        categories: ['uxui', 'web'],
        categoryLabel: 'UX/UI / Web',
        cardRoles: ['UX/UI Designer', 'Web Designer'],
        contributions: [
            'Redesigned the Dino Luzzi webpage with a team in one day.',
            'Reimagined the website layout, visual hierarchy, and product presentation.',
            'Created a modern web prototype focused on brand presence and usability.'
        ],
        madeWith: ['Figma', 'Web Design', 'HTML/CSS'],
        summary: 'A one-day redesign for the Dino Luzzi energy drink website, focused on improving visual polish, product presentation, and user experience.',
        description: 'The Dino Luzzi project was a one-day redesign of the Dino Luzzi webpage. Working with a team, I helped reimagine the website experience with a cleaner visual direction, stronger product presentation, and a more modern interface. The goal was to improve the brand’s online presence and make the site feel more polished, usable, and engaging for visitors.',
        externalLink: { label: 'View Prototype', url: 'https://www.figma.com/proto/osy0fD1ABYY8bGlkzQvK2k/Dino-Luzzi?node-id=7-209&starting-point-node-id=7%3A209&t=WTxht9lNrcisWFgH-1' },
        secondaryLink: { label: 'View Figma', url: 'https://www.figma.com/proto/osy0fD1ABYY8bGlkzQvK2k/Dino-Luzzi?node-id=7-209&starting-point-node-id=7%3A209&t=WTxht9lNrcisWFgH-1' },
        extraLinks: [
            { label: 'View Code', url: 'https://github.com/lachyn21/dinoluzzi' },
            { label: 'Original Website', url: 'https://dinoluzzi.com/' }
        ],
        colors: ['#050505', '#d9a800', '#ffffff'],
        cardImage: 'images/portfolio/dino-luzzi-hero.png',
        gallery: [
            {
                type: 'image',
                src: 'images/portfolio/dino-luzzi-hero.png',
                alt: 'Dino Luzzi energy drink website hero redesign',
                caption: 'Homepage hero redesign focused on a bold black-and-gold product presentation.'
            },
            {
                type: 'image',
                src: 'images/portfolio/dino-luzzi-products.png',
                alt: 'Dino Luzzi product cards redesign',
                caption: 'Product display section showing the original and sugar-free Dino Luzzi drinks.'
            },
            {
                type: 'image',
                src: 'images/portfolio/dino-luzzi-energy.png',
                alt: 'Dino Luzzi maximum energy information section',
                caption: 'Information section highlighting product benefits and visual brand styling.'
            }
        ]
    },
{
        title: 'Wisp: Echoes of the Afterlight',
        eyebrow: '2D pixel-art adventure game',
        year: '2024',
        status: 'Published build',
        team: 'Soul Games',
        popupRole: 'Game Designer',
        teamSize: 'Team project',
        categories: ['game', 'art'],
        categoryLabel: 'Game',
        cardRoles: ['Game Designer', 'Developer', 'Pixel Artist'],
        contributions: [
            'Designed the core soul-guiding adventure and progression flow.',
            'Developed gameplay interactions, puzzles, and boss battle moments.',
            'Built systems around the time-stopping watch, coins, and points.'
        ],
        madeWith: ['Unity', 'C#', 'Pixel Art'],
        summary: 'A 2D pixel-art fantasy adventure about guiding lost souls, uncovering a corrupt underworld, and using a time-stopping watch to survive puzzles and boss encounters.',
        description: 'Embark on a mystical adventure in Wisp, a 2D pixel-art game set in a captivating underworld. As a newly appointed Grim Reaper, the player guides lost souls to peace while uncovering the secrets of a corrupt realm. With a unique time-stopping watch, the player engages in strategic gameplay, faces challenging boss battles, and navigates a dynamic economy of coins and points. The project blends adventure, puzzles, fantasy storytelling, and atmospheric exploration where every choice shapes the path through the afterlife.',
        externalLink: { label: 'Play on Itch.io', url: 'https://ruumien.itch.io/wisp' },
        secondaryLink: { label: 'Watch Trailer', url: 'https://www.youtube.com/watch?v=41WmCLFOm1s' },
        colors: ['#10142e', '#385275', '#a8e8ff'],
        cardImage: 'images/portfolio/wisp-portfolio-1.png',
        gallery: [
            {
                type: 'video',
                src: 'media/wisp-trailer.mp4',
                poster: 'images/portfolio/wisp-portfolio-3.png',
                alt: 'Wisp trailer video',
                caption: 'Official Wisp trailer. The Watch Trailer button also opens the YouTube version.'
            },
            {
                type: 'image',
                src: 'images/portfolio/wisp-portfolio-1.png',
                alt: 'Wisp key art showing the horned shadow creature',
                caption: 'Wisp key art and boss encounter mood image.'
            },
            {
                type: 'image',
                src: 'images/portfolio/wisp-portfolio-2.png',
                alt: 'Wisp boss battle screenshot',
                caption: 'In-game boss battle scene with the player character facing a large shadow enemy.'
            },
            {
                type: 'image',
                src: 'images/portfolio/wisp-portfolio-3.png',
                alt: 'Wisp gameplay warning screenshot',
                caption: 'Gameplay screenshot showing platforming and environmental warning dialogue.'
            }
        ]
    }
];

const projectShowcaseGrid = document.getElementById('projectShowcaseGrid');
const projectFilterBar = document.getElementById('projectFilterBar');
const skillFilterBar = document.getElementById('skillFilterBar');
const skillBubbleCloud = document.getElementById('skillBubbleCloud');
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalEyebrow = document.getElementById('projectModalEyebrow');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectSummaryCopy = document.getElementById('projectSummaryCopy');
const projectStatGrid = document.getElementById('projectStatGrid');
const projectChipRow = document.getElementById('projectChipRow');
const projectActionRow = document.getElementById('projectActionRow');
const projectDescriptionText = document.getElementById('projectDescriptionText');
const projectPreviewButton = document.getElementById('projectPreviewButton');
const projectPreviewMedia = document.getElementById('projectPreviewMedia');

const mediaLightbox = document.getElementById('mediaLightbox');
const mediaLightboxClose = document.getElementById('mediaLightboxClose');
const mediaLightboxTitle = document.getElementById('mediaLightboxTitle');
const mediaLightboxCount = document.getElementById('mediaLightboxCount');
const mediaLightboxStage = document.getElementById('mediaLightboxStage');
const mediaLightboxCaption = document.getElementById('mediaLightboxCaption');
const mediaThumbnailRow = document.getElementById('mediaThumbnailRow');
const mediaPrevButton = document.getElementById('mediaPrevButton');
const mediaNextButton = document.getElementById('mediaNextButton');

let activeProjectIndex = 0;
let activeMediaIndex = 0;
let activeProjectFilter = 'all';
let activeSkillFilter = 'all';



/* =========================================
   Skills Bubble Cloud
   - Edit skillCloudItems to add/remove skills.
   - categories controls sorting: production, tech, design.
   - The bubble size is based on order inside each category:
     first skill = biggest bubble near center, later skills = smaller outward bubbles.
   - The category is NOT shown as text inside the bubble.
   - Bubble color is based on the primary category:
     Production = purple, Tech = blue, Design = pink.
   - iconPath is optional and uses local files from images/icons/.
   - If an icon does not load, or no iconPath is set, the bubble falls back to initials.
   ========================================= */
const skillCloudItems = [
    // ===== Production =====
    // iconPath points to local files in images/icons/.
    // Add future icons to images/icons/ and connect them here.
    { name: 'Jira', categories: ['production'], iconPath: 'images/icons/jira-icon.png' },
    { name: 'Confluence', categories: ['production'], iconPath: 'images/icons/confluence-icon.png' },
    { name: 'Scrum', categories: ['production'], iconPath: 'images/icons/scrum-icon.png' },
    { name: 'Google Docs', categories: ['production'], iconPath: 'images/icons/google-docs-icon.png' },
    { name: 'Word', categories: ['production'], iconPath: 'images/icons/microsoft-word-icon.png' },
    { name: 'Google Sheets', categories: ['production'], iconPath: 'images/icons/google-sheets-icon.png' },
    { name: 'Excel', categories: ['production'], iconPath: 'images/icons/excel-icon.png' },
    { name: 'Perforce', categories: ['production'], iconPath: 'images/icons/perforce-icon.png' },
    { name: 'GitHub', categories: ['production'], iconPath: 'images/icons/github-icon.png' },
    { name: 'Communication', categories: ['production'], iconPath: 'images/icons/communication-icon.png' },
    { name: 'Scheduling', categories: ['production'], iconPath: 'images/icons/scheduling-icon.png' },
    { name: 'Shiftboard', categories: ['production'], iconPath: 'images/icons/shiftboard-icon.png' },
    { name: 'Task Prioritization', categories: ['production'], iconPath: 'images/icons/task-prioritization-icon.png' },
    { name: 'Trello', categories: ['production'], iconPath: 'images/icons/trello-icon.webp' },
    { name: 'ClickUp', categories: ['production'], iconPath: 'images/icons/clickup-icon.png' },
    { name: 'Monday.com', categories: ['production'], iconPath: 'images/icons/monday-icon.png' },

    // ===== Tech =====
    { name: 'Unreal', categories: ['tech'], iconPath: 'images/icons/unreal-engine-icon.png' },
    { name: 'Unity', categories: ['tech'], iconPath: 'images/icons/unity-icon.png' },
    { name: 'HTML', categories: ['tech'], iconPath: 'images/icons/html-icon.png' },
    { name: 'CSS', categories: ['tech'], iconPath: 'images/icons/css-icon.png' },
    { name: 'JavaScript', categories: ['tech'], iconPath: 'images/icons/javascript-icon.png' },
    { name: 'Python', categories: ['tech'], iconPath: 'images/icons/python-icon.png' },
    { name: 'C#', categories: ['tech'], iconPath: 'images/icons/c-sharp-icon.png' },
    { name: 'C++', categories: ['tech'], iconPath: 'images/icons/c-plus-plus-icon.png' },
    { name: 'Visual Studio', categories: ['tech'], iconPath: 'images/icons/visual-studio-icon.png' },
    { name: 'Wix', categories: ['tech'], iconPath: 'images/icons/wix-icon.png' },
    { name: 'WordPress', categories: ['tech'], iconPath: 'images/icons/wordpress-icon.png' },

    // ===== Design =====
    { name: 'Graphic Design', categories: ['design'], iconPath: 'images/icons/graphic-design-icon.png' },
    { name: 'Web Design', categories: ['design'], iconPath: 'images/icons/web-design-icon.png' },
    { name: 'Data Visualization', categories: ['design'], iconPath: 'images/icons/data-visualization-icon.png' },
    { name: 'Photoshop', categories: ['design'], iconPath: 'images/icons/photoshop-icon.png' },
    { name: 'Illustrator', categories: ['design'], iconPath: 'images/icons/illustrator-icon.png' },
    { name: 'PowerPoint', categories: ['design'], iconPath: 'images/icons/powerpoint-icon.png' },
    { name: 'Canva', categories: ['design'], iconPath: 'images/icons/canva-icon.png' },
    { name: 'Premiere Pro', categories: ['design'], iconPath: 'images/icons/premiere-pro-icon.png' },
    { name: 'After Effects', categories: ['design'], iconPath: 'images/icons/after-effects-icon.png' },
    { name: 'Audacity', categories: ['design'], iconPath: 'images/icons/audacity-icon.png' },
    { name: 'Maya', categories: ['design'], iconPath: 'images/icons/maya-icon.png' },
    { name: '3ds Max', categories: ['design'], iconPath: 'images/icons/3ds-max-icon.png' },
    { name: 'Blender', categories: ['design'], iconPath: 'images/icons/blender-icon.png' }
];

const skillCategoryOrder = ['production', 'tech', 'design'];

function getVisibleSkills() {
    if (activeSkillFilter === 'all') return skillCloudItems;
    return skillCloudItems.filter(skill => skill.categories?.includes(activeSkillFilter));
}

function getSkillPrimaryCategory(skill) {
    return skill.categories?.[0] || 'production';
}

function getSkillOrderInCategory(skill) {
    const primaryCategory = getSkillPrimaryCategory(skill);
    return skillCloudItems
        .filter(item => item.categories?.includes(primaryCategory))
        .findIndex(item => item.name === skill.name);
}

function getSkillSizeScale() {
    // Keeps the relative size ranking, but scales the whole cloud down on narrow screens.
    // These values were nudged slightly larger so the bubbles feel more visible while
    // still preserving the no-overlap responsive layout.
    const width = skillBubbleCloud?.clientWidth || window.innerWidth || 1000;

    if (width < 560) return activeSkillFilter === 'all' ? 0.72 : 0.82;
    if (width < 760) return activeSkillFilter === 'all' ? 0.79 : 0.89;
    if (width < 1050) return activeSkillFilter === 'all' ? 0.90 : 1.00;
    return activeSkillFilter === 'all' ? 0.98 : 1.08;
}

function getSkillBubbleSize(skill, visibleSkills) {
    // Size is based on the order inside each tag/category.
    // First in its category = largest and placed near the center; later skills get smaller and move outward.
    const primaryCategory = getSkillPrimaryCategory(skill);
    const skillsInCategory = skillCloudItems.filter(item => item.categories?.includes(primaryCategory));
    const orderInCategory = Math.max(0, getSkillOrderInCategory(skill));
    const maxSize = activeSkillFilter === 'all' ? 126 : 148;
    const minSize = activeSkillFilter === 'all' ? 66 : 82;
    const steps = Math.max(skillsInCategory.length - 1, 1);
    const size = maxSize - ((maxSize - minSize) * (orderInCategory / steps));

    // Slightly protect multi-word labels without breaking the overall size ranking.
    const longNameBonus = skill.name.length > 14 ? 4 : 0;
    return Math.round((size + longNameBonus) * getSkillSizeScale());
}

function getSkillLabelFontSize(skill, bubbleSize) {
    // Text shrinks based on the longest word so single long words do not overflow.
    const label = String(skill.name || '');
    const words = label.replace(/\.com/gi, '').split(/[\s/]+/).filter(Boolean);
    const longestWord = words.reduce((max, word) => Math.max(max, word.length), 0);
    const totalLength = label.length;

    let size = Math.max(8.2, Math.min(14.2, bubbleSize * 0.105));

    if (longestWord >= 15) size -= 3.2;
    else if (longestWord >= 13) size -= 2.6;
    else if (longestWord >= 11) size -= 1.7;
    else if (longestWord >= 9) size -= 0.9;

    if (totalLength > 18) size -= 1.1;
    else if (totalLength > 14) size -= 0.6;

    if (bubbleSize < 78) size -= 0.8;
    if (bubbleSize < 68) size -= 0.8;

    return Math.max(7.2, Number(size.toFixed(1)));
}

function getSkillClusterPosition(skill, index, visibleSkills) {
    // Fallback position only. The real no-overlap placement is calculated
    // after the bubbles render by layoutSkillBubbles().
    return { x: 50, y: 50 };
}

function getDesiredSkillCloudHeight(rankedBubbles, cloudWidth) {
    const count = rankedBubbles.length;
    const largest = rankedBubbles[0]?.size || 110;
    const totalArea = rankedBubbles.reduce((sum, entry) => {
        const radius = (entry.size / 2) + 7;
        return sum + Math.PI * radius * radius;
    }, 0);

    // Higher density keeps the cluster box compact. If this is too tight on a screen,
    // layoutSkillBubbles() automatically expands the height until everything fits.
    const density = cloudWidth < 760 ? 0.78 : cloudWidth < 1050 ? 0.72 : 0.68;
    const areaHeight = (totalArea / Math.max(cloudWidth * density, 1)) + largest + 46;

    const minimum = activeSkillFilter === 'all'
        ? (cloudWidth < 560 ? 720 : cloudWidth < 760 ? 660 : cloudWidth < 1050 ? 560 : 500)
        : (cloudWidth < 560 ? 520 : cloudWidth < 760 ? 480 : 420);

    return Math.ceil(Math.max(minimum, areaHeight));
}

function layoutSkillBubbles() {
    if (!skillBubbleCloud) return;

    const bubbles = Array.from(skillBubbleCloud.querySelectorAll('.skill-bubble'));
    if (!bubbles.length) return;

    const cloudWidth = skillBubbleCloud.clientWidth;
    const padding = cloudWidth < 760 ? 14 : 22;
    const gap = cloudWidth < 760 ? 2 : 4;

    // Sort by bubble size so the biggest bubbles are placed closest to the center,
    // and smaller bubbles naturally move toward the outside of the cloud.
    const ranked = bubbles
        .map((bubble, renderIndex) => ({
            bubble,
            renderIndex,
            size: parseFloat(bubble.dataset.size || bubble.style.getPropertyValue('--bubble-size')) || 100
        }))
        .sort((a, b) => b.size - a.size || a.renderIndex - b.renderIndex);

    let targetHeight = getDesiredSkillCloudHeight(ranked, cloudWidth);

    function tryPlace(cloudHeight) {
        const centerX = cloudWidth * 0.5;
        const centerY = cloudHeight * 0.5;
        const placed = [];
        const positions = [];

        function fits(candidateX, candidateY, radius) {
            if (candidateX - radius < padding || candidateX + radius > cloudWidth - padding) return false;
            if (candidateY - radius < padding || candidateY + radius > cloudHeight - padding) return false;

            return placed.every(other => {
                const dx = candidateX - other.x;
                const dy = candidateY - other.y;
                const requiredDistance = radius + other.radius + gap;
                return (dx * dx + dy * dy) >= requiredDistance * requiredDistance;
            });
        }

        for (let rank = 0; rank < ranked.length; rank += 1) {
            const entry = ranked[rank];
            const radius = entry.size / 2;
            let chosen = null;

            if (rank === 0 && fits(centerX, centerY, radius)) {
                chosen = { x: centerX, y: centerY };
            }

            if (!chosen) {
                const goldenAngle = Math.PI * (3 - Math.sqrt(5));
                const maxDistance = Math.sqrt(cloudWidth * cloudWidth + cloudHeight * cloudHeight) * 0.62;

                for (let distance = 0; distance <= maxDistance && !chosen; distance += 4) {
                    const samples = Math.max(20, Math.ceil(distance / 4));

                    for (let sample = 0; sample < samples; sample += 1) {
                        const angle = (rank * goldenAngle) + ((Math.PI * 2 * sample) / samples);
                        const x = centerX + Math.cos(angle) * distance * 1.15;
                        const y = centerY + Math.sin(angle) * distance * 0.94;

                        if (fits(x, y, radius)) {
                            chosen = { x, y };
                            break;
                        }
                    }
                }
            }

            if (!chosen) return null;

            placed.push({ x: chosen.x, y: chosen.y, radius });
            positions.push({ bubble: entry.bubble, x: chosen.x, y: chosen.y });
        }

        return positions;
    }

    let positions = null;
    for (let attempt = 0; attempt < 5 && !positions; attempt += 1) {
        skillBubbleCloud.style.minHeight = `${targetHeight}px`;
        positions = tryPlace(targetHeight);
        if (!positions) targetHeight += cloudWidth < 760 ? 90 : 70;
    }

    // Extremely small screens fallback: keep the size ranking but use a compact masonry-like layout.
    if (!positions) {
        const columns = Math.max(2, Math.floor(cloudWidth / 105));
        const columnHeights = Array(columns).fill(padding);
        const cellWidth = cloudWidth / columns;
        positions = ranked.map(entry => {
            const column = columnHeights.indexOf(Math.min(...columnHeights));
            const x = column * cellWidth + cellWidth / 2;
            const y = columnHeights[column] + entry.size / 2;
            columnHeights[column] += entry.size + gap;
            return { bubble: entry.bubble, x, y };
        });
        skillBubbleCloud.style.minHeight = `${Math.max(...columnHeights) + padding}px`;
    }

    positions.forEach(position => {
        position.bubble.style.setProperty('--cluster-x', `${position.x.toFixed(1)}px`);
        position.bubble.style.setProperty('--cluster-y', `${position.y.toFixed(1)}px`);
    });
}

function getSkillInitials(name) {
    return String(name || 'Skill')
        .replace(/\.com/gi, '')
        .split(/\s|\//)
        .filter(Boolean)
        .map(part => part[0])
        .join('')
        .slice(0, 3)
        .toUpperCase();
}

function getSkillIconMarkup(skill) {
    const initials = getSkillInitials(skill.name);

    // Use local uploaded icon art when iconPath exists.
    // Add future icon files to images/icons/ and point to them here:
    // iconPath: 'images/icons/your-icon-file.png'
    if (skill.iconPath) {
        return `
            <img class="skill-bubble-icon-img" src="${skill.iconPath}" alt="" aria-hidden="true" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-flex';">
            <span class="skill-icon-fallback is-hidden">${initials}</span>
        `;
    }

    return `<span class="skill-icon-fallback">${initials}</span>`;
}

function renderSkillBubbles() {
    if (!skillBubbleCloud) return;

    const visibleSkills = getVisibleSkills();

    if (!visibleSkills.length) {
        skillBubbleCloud.innerHTML = '<p class="skill-empty-message">No skills found for this category yet.</p>';
        return;
    }

    skillBubbleCloud.innerHTML = visibleSkills.map((skill, index) => {
        const size = getSkillBubbleSize(skill, visibleSkills);
        const labelSize = getSkillLabelFontSize(skill, size);
        const primaryCategory = getSkillPrimaryCategory(skill);
        const { x, y } = getSkillClusterPosition(skill, index, visibleSkills);

        return `
            <button class="skill-bubble skill-bubble-${primaryCategory}" type="button" data-primary-category="${primaryCategory}" data-size="${size}" aria-label="${skill.name} skill" style="--bubble-size: ${size}px; --label-size: ${labelSize}px; --cluster-x: ${x}%; --cluster-y: ${y}%;">
                <span class="skill-bubble-icon">${getSkillIconMarkup(skill)}</span>
                <span class="skill-bubble-label">${skill.name}</span>
            </button>
        `;
    }).join('');

    requestAnimationFrame(layoutSkillBubbles);
}

function resetSkillBubblePositions() {
    if (!skillBubbleCloud) return;
    skillBubbleCloud.querySelectorAll('.skill-bubble').forEach(bubble => {
        bubble.style.setProperty('--push-x', '0px');
        bubble.style.setProperty('--push-y', '0px');
    });
}

function moveSkillBubbles(event) {
    if (!skillBubbleCloud) return;

    const cloudRect = skillBubbleCloud.getBoundingClientRect();
    const mouseX = event.clientX - cloudRect.left;
    const mouseY = event.clientY - cloudRect.top;

    skillBubbleCloud.querySelectorAll('.skill-bubble').forEach((bubble, index) => {
        const bubbleRect = bubble.getBoundingClientRect();
        const bubbleX = bubbleRect.left - cloudRect.left + bubbleRect.width / 2;
        const bubbleY = bubbleRect.top - cloudRect.top + bubbleRect.height / 2;
        const dx = mouseX - bubbleX;
        const dy = mouseY - bubbleY;
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const influence = Math.max(0, 1 - distance / 210);
        const orbit = (index % 2 === 0 ? 1 : -1) * influence * 2;
        const pushX = ((-dx / distance) * influence * 10) + orbit;
        const pushY = ((-dy / distance) * influence * 10) - orbit;

        bubble.style.setProperty('--push-x', `${pushX.toFixed(1)}px`);
        bubble.style.setProperty('--push-y', `${pushY.toFixed(1)}px`);
    });
}


function getVisibleProjects() {
    if (activeProjectFilter === 'all') return portfolioProjects;
    return portfolioProjects.filter(project => project.categories?.includes(activeProjectFilter));
}

function renderProjectCards() {
    if (!projectShowcaseGrid) return;

    projectShowcaseGrid.innerHTML = '';

    const visibleProjects = getVisibleProjects();

    if (!visibleProjects.length) {
        projectShowcaseGrid.innerHTML = '<p class="project-empty-message">No projects found for this category yet.</p>';
        return;
    }

    visibleProjects.forEach((project) => {
        const projectIndex = portfolioProjects.indexOf(project);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'project-card';
        button.dataset.categories = (project.categories || []).join(' ');
        button.setAttribute('aria-label', `Open details for ${project.title}`);

        const cardRoles = project.cardRoles || [];
        const rolesHtml = cardRoles.map(role => `<li>${role}</li>`).join('');
        const contributionsHtml = project.contributions.map(item => `<li>${item}</li>`).join('');
        const madeWithHtml = project.madeWith.slice(0, 3).map(item => `<span class="project-tech-pill">${item}</span>`).join('');

        button.innerHTML = `
            <img class="project-card-image" src="${project.cardImage}" alt="${project.title} cover image">
            <div class="project-card-overlay">
                <div class="project-overlay-column">
                    <div class="project-overlay-block">
                        <p class="project-overlay-heading">Worked as</p>
                        <ul class="project-overlay-list">${rolesHtml}</ul>
                    </div>
                    <div class="project-overlay-block">
                        <div class="project-overlay-engine">
                            <span class="project-overlay-engine-label">Made with</span>
                            <span class="project-overlay-engine-value">${project.madeWith[0] || 'Toolset'}</span>
                        </div>
                    </div>
                </div>

                <div class="project-overlay-column">
                    <div class="project-overlay-block">
                        <p class="project-overlay-heading">Doing</p>
                        <ul class="project-overlay-list">${contributionsHtml}</ul>
                    </div>
                </div>
            </div>

            <div class="project-card-footer">
                <div class="project-card-title-row">
                    <h3 class="project-card-title">${project.title}</h3>
                    <span class="project-card-year">${project.year}</span>
                </div>
                <div class="project-card-meta-row">
                    <span class="project-card-category">${project.categoryLabel || (project.categories?.[0] || 'Project')}</span>
                </div>
                <div class="project-card-tech">${madeWithHtml}</div>
            </div>
        `;

        button.addEventListener('click', () => openProjectModal(projectIndex));
        projectShowcaseGrid.appendChild(button);
    });

    document.querySelectorAll('.project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        if (typeof observer !== 'undefined') {
            observer.observe(el);
        }
    });
}

// PROJECT MODAL INFO CARDS
// These four cards appear in the top-right popup panel.
// Edit project.year, project.status, project.popupRole, and project.teamSize inside each project object.
// NOTE: project.popupRole controls the popup only.
// project.cardRoles controls the card hover overlay only.
function renderStatGrid(project) {
    const stats = [
        { label: 'Year', value: project.year || '—' },
        { label: 'Status', value: project.status || '—' },
        { label: 'Role', value: project.popupRole || '—' },
        { label: 'Team Size', value: project.teamSize || '—' }
    ];

    projectStatGrid.innerHTML = stats.map(stat => `
        <div class="project-stat-card">
            <span class="project-stat-label">${stat.label}</span>
            <span class="project-stat-value">${stat.value}</span>
        </div>
    `).join('');
}

function renderChips(project) {
    projectChipRow.innerHTML = project.madeWith.map(item => `
        <span class="project-chip">${item}</span>
    `).join('');
}

function renderActions(project) {
    const actions = [];
    if (project.externalLink?.url) {
        actions.push(`<a class="project-action" href="${project.externalLink.url}" target="_blank" rel="noopener">${project.externalLink.label || 'Visit project'}</a>`);
    }
    if (project.secondaryLink?.url) {
        actions.push(`<a class="project-action secondary" href="${project.secondaryLink.url}" target="_blank" rel="noopener">${project.secondaryLink.label || 'More details'}</a>`);
    }
    // Optional extra links for projects that need more than two buttons.
    // Example: extraLinks: [{ label: 'View Code', url: 'https://...' }]
    if (Array.isArray(project.extraLinks)) {
        project.extraLinks.forEach(link => {
            if (link?.url) {
                actions.push(`<a class="project-action secondary" href="${link.url}" target="_blank" rel="noopener">${link.label || 'Open link'}</a>`);
            }
        });
    }
    actions.push(`<button class="project-action secondary" type="button" id="openGalleryAction">Open Gallery</button>`);
    projectActionRow.innerHTML = actions.join('');

    const openGalleryAction = document.getElementById('openGalleryAction');
    if (openGalleryAction) {
        openGalleryAction.addEventListener('click', () => openMediaLightbox(activeProjectIndex, 0));
    }
}

function setPreviewMedia(mediaItem) {
    if (!mediaItem) return;

    if (mediaItem.type === 'youtube') {
        projectPreviewMedia.innerHTML = `
            <div class="project-youtube-preview">
                <img src="${mediaItem.poster || createShowcasePlaceholder('Trailer', '#10142e', '#385275', '#a8e8ff', 'YouTube preview')}" alt="${mediaItem.alt || 'YouTube trailer preview'}">
                <span class="project-youtube-play">▶</span>
            </div>
        `;
        return;
    }

    if (mediaItem.type === 'video') {
        projectPreviewMedia.innerHTML = `
            <video src="${mediaItem.src}" ${mediaItem.poster ? `poster="${mediaItem.poster}"` : ''} muted playsinline loop autoplay></video>
        `;
    } else {
        projectPreviewMedia.innerHTML = `
            <img src="${mediaItem.src}" alt="${mediaItem.alt || 'Project preview image'}">
        `;
    }
}

function openProjectModal(index) {
    const project = portfolioProjects[index];
    if (!project) return;

    activeProjectIndex = index;
    activeMediaIndex = 0;
    // The separate logo/title box above the modal title was removed.
    // The modal now uses only the main project title below the eyebrow.

    projectModalEyebrow.textContent = project.eyebrow || 'Project';
    projectModalTitle.textContent = project.title;

    const hasSummary = Boolean(project.summary);
    projectSummaryCopy.textContent = hasSummary ? project.summary : '';
    projectSummaryCopy.closest('.project-summary-top')?.classList.toggle('is-hidden', !hasSummary);

    projectDescriptionText.textContent = project.description || '';
    renderStatGrid(project);
    renderChips(project);
    renderActions(project);
    setPreviewMedia(project.gallery[0]);

    projectModal.classList.add('is-open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');

    if (!mediaLightbox.classList.contains('is-open')) {
        document.body.classList.remove('modal-open');
    }

    const previewVideo = projectPreviewMedia.querySelector('video');
    if (previewVideo) {
        previewVideo.pause();
    }
}

function renderLightboxMedia() {
    const project = portfolioProjects[activeProjectIndex];
    const mediaItem = project?.gallery?.[activeMediaIndex];
    if (!mediaItem) return;

    mediaLightboxTitle.textContent = project.title;
    mediaLightboxCount.textContent = `${activeMediaIndex + 1} / ${project.gallery.length}`;
    mediaLightboxCaption.textContent = mediaItem.caption || '';
    mediaLightboxStage.innerHTML = '';

    if (mediaItem.type === 'youtube') {
        const link = document.createElement('a');
        link.className = 'youtube-open-link';
        link.href = mediaItem.src;
        link.target = '_blank';
        link.rel = 'noopener';
        link.innerHTML = `
            <img src="${mediaItem.poster || createShowcasePlaceholder('Trailer', '#10142e', '#385275', '#a8e8ff', 'YouTube preview')}" alt="${mediaItem.alt || `${project.title} trailer`}">
            <span class="youtube-open-overlay">
                <span class="youtube-open-play">▶</span>
                <span class="youtube-open-text">Watch trailer on YouTube ↗</span>
            </span>
        `;
        mediaLightboxStage.appendChild(link);
    } else if (mediaItem.type === 'video') {
        const video = document.createElement('video');
        video.src = mediaItem.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        if (mediaItem.poster) {
            video.poster = mediaItem.poster;
        }
        mediaLightboxStage.appendChild(video);
    } else {
        const image = document.createElement('img');
        image.src = mediaItem.src;
        image.alt = mediaItem.alt || `${project.title} media ${activeMediaIndex + 1}`;
        mediaLightboxStage.appendChild(image);
    }

    mediaThumbnailRow.innerHTML = project.gallery.map((item, index) => {
        const thumbSrc = item.type === 'video' || item.type === 'youtube'
            ? (item.poster || createShowcasePlaceholder('Video', '#1c233a', '#5f2f78', '#d0f7ff', 'Replace poster'))
            : item.src;
        const thumbLabel = item.type === 'youtube' ? 'YouTube trailer thumbnail' : (item.alt || 'Gallery thumbnail');
        const playBadge = item.type === 'video' || item.type === 'youtube' ? '<span class="media-thumbnail-play">▶</span>' : '';

        return `
            <button class="media-thumbnail ${index === activeMediaIndex ? 'is-active' : ''}" type="button" data-media-index="${index}" aria-label="Open media ${index + 1}">
                <img src="${thumbSrc}" alt="${thumbLabel}">
                ${playBadge}
            </button>
        `;
    }).join('');

    mediaThumbnailRow.querySelectorAll('.media-thumbnail').forEach(button => {
        button.addEventListener('click', () => {
            activeMediaIndex = Number(button.dataset.mediaIndex);
            renderLightboxMedia();
        });
    });
}

function openMediaLightbox(projectIndex = activeProjectIndex, mediaIndex = 0) {
    activeProjectIndex = projectIndex;
    activeMediaIndex = mediaIndex;

    mediaLightbox.classList.add('is-open');
    mediaLightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    renderLightboxMedia();
}

function closeMediaLightbox() {
    mediaLightbox.classList.remove('is-open');
    mediaLightbox.setAttribute('aria-hidden', 'true');

    const lightboxVideo = mediaLightboxStage.querySelector('video');
    if (lightboxVideo) {
        lightboxVideo.pause();
    }
    mediaLightboxStage.innerHTML = '';

    if (!projectModal.classList.contains('is-open')) {
        document.body.classList.remove('modal-open');
    }
}

function showPreviousMedia() {
    const project = portfolioProjects[activeProjectIndex];
    if (!project) return;
    activeMediaIndex = (activeMediaIndex - 1 + project.gallery.length) % project.gallery.length;
    renderLightboxMedia();
}

function showNextMedia() {
    const project = portfolioProjects[activeProjectIndex];
    if (!project) return;
    activeMediaIndex = (activeMediaIndex + 1) % project.gallery.length;
    renderLightboxMedia();
}

if (projectPreviewButton) {
    projectPreviewButton.addEventListener('click', () => openMediaLightbox(activeProjectIndex, 0));
}

if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
}

if (mediaLightboxClose) {
    mediaLightboxClose.addEventListener('click', closeMediaLightbox);
}

document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeProjectModal);
});

document.querySelectorAll('[data-close-lightbox]').forEach(el => {
    el.addEventListener('click', closeMediaLightbox);
});

if (mediaPrevButton) {
    mediaPrevButton.addEventListener('click', showPreviousMedia);
}

if (mediaNextButton) {
    mediaNextButton.addEventListener('click', showNextMedia);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (mediaLightbox.classList.contains('is-open')) {
            closeMediaLightbox();
            return;
        }

        if (projectModal.classList.contains('is-open')) {
            closeProjectModal();
        }
    }

    if (!mediaLightbox.classList.contains('is-open')) return;

    if (event.key === 'ArrowLeft') {
        showPreviousMedia();
    } else if (event.key === 'ArrowRight') {
        showNextMedia();
    }
});


if (projectFilterBar) {
    projectFilterBar.addEventListener('click', (event) => {
        const button = event.target.closest('.project-filter-button');
        if (!button) return;

        activeProjectFilter = button.dataset.filter || 'all';

        projectFilterBar.querySelectorAll('.project-filter-button').forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle('is-active', isActive);
            filterButton.setAttribute('aria-pressed', String(isActive));
        });

        renderProjectCards();
    });

    projectFilterBar.querySelectorAll('.project-filter-button').forEach(button => {
        button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    });
}


if (skillFilterBar) {
    skillFilterBar.addEventListener('click', (event) => {
        const button = event.target.closest('.skill-filter-button');
        if (!button) return;

        activeSkillFilter = button.dataset.filter || 'all';

        skillFilterBar.querySelectorAll('.skill-filter-button').forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle('is-active', isActive);
            filterButton.setAttribute('aria-pressed', String(isActive));
        });

        renderSkillBubbles();
        resetSkillBubblePositions();
    });

    skillFilterBar.querySelectorAll('.skill-filter-button').forEach(button => {
        button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    });
}

if (skillBubbleCloud) {
    let skillMoveFrame = null;
    let lastSkillMoveEvent = null;

    skillBubbleCloud.addEventListener('mousemove', (event) => {
        lastSkillMoveEvent = event;
        if (skillMoveFrame) return;

        skillMoveFrame = requestAnimationFrame(() => {
            moveSkillBubbles(lastSkillMoveEvent);
            skillMoveFrame = null;
        });
    });

    skillBubbleCloud.addEventListener('mouseleave', resetSkillBubblePositions);
}


window.addEventListener('resize', () => {
    if (!skillBubbleCloud) return;
    window.clearTimeout(window.__skillLayoutResizeTimer);
    window.__skillLayoutResizeTimer = window.setTimeout(() => {
        layoutSkillBubbles();
        resetSkillBubblePositions();
    }, 120);
});

renderSkillBubbles();

renderProjectCards();
