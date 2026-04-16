<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/icons/favicon.svg';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import {fade, scale, fly} from 'svelte/transition';
    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" type="image/svg+xml" href="{favicon}" />
    <title>Software Development by Steylish</title>
    <meta name="description" content="Danny Stey - Steylish Software Development: Erfahrene Softwareentwicklung für individuelle Lösungen, Web-Anwendungen und digitale Innovationen aus Mühldorf." />
    {@html `
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Danny Stey - Steylish Software Development",
            "image": "https://steylish.de/images/danny-stey.png",
            "@id": "https://steylish.de/#localbusiness",
            "url": "https://steylish.de",
            "telephone": "+491736528134",
            "email": "hi@steylish.de",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Paul-Kurz-Str. 21",
                "addressLocality": "Mühldorf",
                "postalCode": "84453",
                "addressCountry": "DE"
            },
            "vatID": "DE327550972",
            "founder": {
                "@type": "Person",
                "name": "Danny Stey"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Software Development Services",
                "itemListElement": [
                    {
                        "@type": "OfferCatalog",
                        "name": "Immersive web experiences",
                        "itemListElement": [
                            {
                                "@type": "Service",
                                "name": "Immersive web experiences",
                                "description": "High-performance WebGL and Three.js 3D web experiences built with senior fullstack expertise."
                            }
                        ]
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "Interim Technical Leadership",
                        "itemListElement": [
                            {
                                "@type": "Service",
                                "name": "Interim Technical Leadership",
                                "description": "Stabilizing complex codebases, optimizing workflows, and transforming technical debt into high-performance architecture while mentoring teams."
                            }
                        ]
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "Digital Modernization",
                        "itemListElement": [
                            {
                                "@type": "Service",
                                "name": "Digital Modernization",
                                "description": "Modernizing software architecture to be future-proof, flexible, and secure."
                            }
                        ]
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "AI Prototype Professionalization",
                        "itemListElement": [
                            {
                                "@type": "Service",
                                "name": "AI Prototype Professionalization",
                                "description": "Auditing, refactoring, and hardening AI-generated applications to make them production-ready."
                            }
                        ]
                    }
                ]
            }
        }
    </script>
    `}
</svelte:head>
<main class="bg-white text-neutral-800 min-h-screen m-2 overflow-x-hidden">
    <Header></Header>
    {#key data.pathname}
    <div in:fly={{x: 100, duration: 600, delay: 300  }} out:fly={{x:-100, duration: 400}}>
        {@render children()}
    </div>
    {/key}
    <Footer></Footer>
</main>
