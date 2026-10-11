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
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://steylish.de/#service-immersive-web-experiences",
                            "name": "Immersive web experiences"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://steylish.de/#service-interim-technical-leadership",
                            "name": "Interim Technical Leadership"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://steylish.de/#service-digital-modernization",
                            "name": "Digital Modernization"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://steylish.de/#service-ai-prototype-professionalization",
                            "name": "AI Prototype Professionalization"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "@id": "https://steylish.de/#service-ai-supported-software-development",
                            "name": "AI-supported Software Development"
                        }
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
