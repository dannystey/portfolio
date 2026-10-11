<script lang="ts">
    const site = 'https://steylish.de';

    const services = [
        {
            id: 'immersive-web-experiences',
            name: 'Immersive web experiences',
            serviceType: '3D web development',
            description: 'High-performance immersive 3D web experiences that live directly in the browser, built with senior fullstack expertise, WebGL and Three.js, without compromising on speed or accessibility.'
        },
        {
            id: 'interim-technical-leadership',
            name: 'Interim Technical Leadership',
            serviceType: 'Interim technical leadership',
            description: 'Interim Head of Engineering: stabilizing complex codebases, optimizing development workflows, turning technical debt into high-performance architecture and mentoring teams, including AI-enhanced workflows.'
        },
        {
            id: 'digital-modernization',
            name: 'Digital Modernization',
            serviceType: 'Software modernization',
            description: 'Modernizing software architecture to make it future-proof, flexible, fast and secure, as a complete rebuild or a step-by-step modernization.'
        },
        {
            id: 'ai-prototype-professionalization',
            name: 'AI Prototype Professionalization',
            serviceType: 'Code audit and refactoring',
            description: 'Auditing, refactoring and hardening AI-generated applications and MVPs (e.g. built with Claude or Lovable) to make them production-ready: security checks, performance tuning and architectural cleanup.'
        }
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': services.map((service) => ({
            '@type': 'Service',
            '@id': `${site}/#service-${service.id}`,
            name: service.name,
            serviceType: service.serviceType,
            description: service.description,
            url: `${site}/#services`,
            provider: { '@id': `${site}/#localbusiness` },
            areaServed: [
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'Country', name: 'Austria' }
            ]
        }))
    };
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<div id="services" class="max-w-screen-xl relative mx-auto px-5 lg:px-12 mb-40">
    <div class="grid grid-cols-1 mb-10">
        <h2 class="text-3xl mb-5 font-bold headline">Services</h2>
        <p class="text-xl"></p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr gap-2">
        <div class="bg-de-york-50 rounded-2xl p-8 flex flex-col">
            <h3 class="text-2xl font-bold mb-4 headline ">Immersive web experiences</h3>
            <div class="prose max-w-none text-neutral-500">
                <p>
                    Static websites are no longer enough to capture the modern user’s attention. I combine <strong>Senior Fullstack
                    expertise</strong> with cutting-edge <strong>WebGL mastery to build immersive 3D web experiences</strong> that live directly in
                    the browser.
                </p>
                <p>
                    By prioritizing <strong>high-performance architecture</strong> and seamless Three.js integration, I help brands transform
                    complex products into interactive journeys—without compromising on speed or accessibility. Elevate your
                    digital presence with environments that don't just look stunning, but perform flawlessly.
                </p>
            </div>
        </div>

        <div class="bg-de-york-50 rounded-2xl p-8 flex flex-col">
            <h3 class="text-2xl font-bold mb-4 headline">Interim Technical Leadership</h3>
            <div class="prose max-w-none text-neutral-500">
                <p>
                    I bridge the gap between <strong>business goals</strong> and <strong>engineering execution</strong>. Drawing on my experience as Head of Engineering, I step in to <strong>stabilize complex codebases</strong>, <strong>optimize development workflows</strong>, and transform technical debt into <strong>high-performance architecture</strong>.

                </p>
                <p>
                    My approach goes beyond code: I mentor your team to <strong>build internal competence</strong> and <strong>high motivation</strong>, while pragmatically integrating modern, AI-enhanced workflows to <strong>boost productivity</strong>. I don't just fix your software — I empower your people to build the future of your company.
                </p>
            </div>
        </div>

        <div class="bg-de-york-50 rounded-2xl p-8 flex flex-col">
            <h3 class="text-2xl font-bold mb-4 headline">Digital Modernization</h3>
            <div class="prose max-w-none text-neutral-500">
                <p>
                    Many companies struggle with systems that can no longer keep pace with their success. I modernize your software architecture to make it <strong>future-proof</strong>. My approach ensures your IT remains flexible, your processes become faster, and your data stays secure and accessible.

                </p>
                <p>
                    Whether it’s a complete rebuild or a step-by-step modernization: I ensure your technology is no longer an obstacle, but a genuine competitive advantage.
                </p>
            </div>
        </div>

        <div class="bg-de-york-50 rounded-2xl p-8 flex flex-col">
            <h3 class="text-2xl font-bold mb-4 headline">Your AI Prototype, Professionalized.</h3>
            <div class="prose max-w-none text-neutral-500">
                <p>
                    Did you use Claude, Lovable or you-name-it to build a promising MVP, but now you’re worried about security, scaling, and messy code? I help you bridge that final, crucial mile. I audit, refactor, and harden AI-generated applications to <strong>make them production-ready</strong>.
                </p>
                <p>
                    From security checks to performance tuning and architectural cleanup, I ensure your "prompted" software meets the highest professional standards. Keep the innovation, lose the technical debt.
                </p>
            </div>
        </div>
    </div>
</div>