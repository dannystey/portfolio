<script>
    import Button from '$lib/components/Button.svelte';
</script>

<div class="max-w-screen-xl relative mx-auto text-sm py-[200px] print:py-0">
    <div class="max-w-3xl mx-auto grid grid-cols-4 gap-10">
        <div class="col-span-4">
            <h1 class="headline text-4xl font-bold mb-10 print:hidden">Curriculum Vitae</h1>
            <span class="text-4xl font-bold mb-10 hidden print:block">Danny Stey - Curriculum Vitae</span>
        </div>
        <div>
            <img src="/images/danny.png" class="rounded-full w-full aspect-square bg-neutral-200 mx-auto mb-10"/>
            <p>
                Danny Stey<br/>
                Freelance Engineer & Interim Team Lead, <br/>
                He/him<br/>
                German, English
            </p>
        </div>
        <div class="col-span-3 space-y-10">
            <div class="space-y-4">
                <h2>About</h2>
                <p>I began my career as an intern at the online marketing agency "coma" back in2009 and quickly advanced
                    from a junior to a senior web developer. In 2016, I took on the role of managing the technical
                    department, overseeing teams in both Munich and Valencia.</p>
                <p>After nine years at coma, I transitioned to Virtual Identity as a Senior Frontend Architect while also
                    freelancing on the side. As my freelance work grew, I made the leap to full-time freelancing in
                    October 2019.</p>
                <p>In 2020, I had the opportunity to shape the frontend team at pixx.io as an Interim Team Lead. After
                    successfully launching the new pixx.io in 2021, I joined the company full-time, becoming Head of
                    Engineering. However, in 2023, I got the opportunity to create and shape new projects, so I embraced
                    the change and returned to freelancing. </p>
                <p>Now, I'm excited to continue my journey!</p>
            </div>
            <div>
                <h2 class="mb-4">Personal Expierence</h2>
                <div class="grid grid-cols-4 gap-x-10 gap-y-2">
                    <div>
                        <p>Born</p>
                    </div>
                    <div class="col-span-3">
                        <p>1989 in Altötting, Germany</p>
                    </div>
                    <div>
                        <p>Location</p>
                    </div>
                    <div class="col-span-3">
                        <p>Mühldorf am Inn, Germany</p>
                    </div>
                    <div>
                        <p>Marital status</p>
                    </div>
                    <div class="col-span-3">
                        <p>Married, 3 children</p>
                    </div>

                </div>
            </div>
            <div>
                <h2 class="mb-4">Work Expierence</h2>
                <div class="grid grid-cols-4 gap-x-10 gap-y-8">
                    <div>
                        <p>2023 - now</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Freelance Engineer</p>
                        <p>Around Germany and Austria</p>
                        <p class="text-gray-500">
                            Working as a freelance engineer for various clients, focusing on web development,
                            consulting and leading teams.
                        </p>
                        <p class="text-gray-500">
                            Clients: rc-tec, pixx.io, coma, collect.Ai, WAF Seminare, shareDnC, Buzzin Monkey,
                            Pentacoastal, Ideenbude
                        </p>
                    </div>
                    <div>
                        <p>2021 - 2023</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Head of Engineering & Teamlead Frontend at pixx.io</p>
                        <p>Mühldorf am Inn, Germany</p>
                        <p class="text-gray-500">
                            I was responsible for leading the engineering team, overseeing the development and
                            maintenance of
                            the pixx.io digital asset management platform.</p>
                        <p class="text-gray-500">My role involved managing a team of developers,
                            coordinating projects, and ensuring the delivery of high-quality software solutions.
                        </p>
                    </div>
                    <div>
                        <p>2019 - 2021</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Freelance Engineer</p>
                        <p>Around Germany and Austria</p>
                    </div>
                    <div>
                        <p>2019 - 2019</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Senior Frontend Architect at Virtual Identity</p>
                        <p>Munich, Germany</p>
                        <p class="text-gray-500">Working on various projects for greater Companies, like Infineon, MunichRE and Caritas.</p>
                    </div>
                    <div>
                        <p>2016 - 2019</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Head of Development at coma</p>
                        <p>Munich, Germany</p>
                        <p class="text-gray-500">As Head I was responsible for the development team in Munich and in Valencia, Spain.</p>
                    </div>
                    <div>
                        <p>2014 - 2016</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Senior Web Developer at coma</p>
                        <p>Munich, Germany</p>
                        <p class="text-gray-500">I was responsible for the development of various digital marketing projects, including technical leadership for specific clients, like Beck's or Tempo.</p>
                    </div>
                    <div>
                        <p>2010 - 2014</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Web Developer at coma</p>
                        <p>Munich, Germany</p>
                        <p class="text-gray-500">I developed a lot of digital marketing projects and made my first experiences.</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="mb-4">Education</h2>
                <div class="grid grid-cols-4 gap-x-10 gap-y-8">
                    <div>
                        <p>2007 - 2011</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Bachelor of engineering at TH Deggendorf</p>
                        <p>Deggendorf, Germany</p>
                        <p class="text-gray-500">
                            Studied media technology with focus on media informatics and graduated with a
                            bachelor's degree in engineering.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="mb-4">Skills</h2>
                <div class="grid grid-cols-4 gap-x-10 gap-y-8">
                    <div>
                        <p>Frontend</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>Angular, React, svelte, Vue, TailwindCSS, SASS, TypeScript, JavaScript</p>
                    </div>
                    <div>
                        <p>Backend</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>Laravel, Symfony, PHP, NestJS, NodeJS, SQL, Redis, MongoDB</p>
                    </div>
                    <div>
                        <p>Leadership</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>Leading, Coaching, Mentoring, Hands-on mentality, Teamwork, economical</p>
                    </div>
                    <div>
                        <p>Others</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>SCRUM, Agile, Software architecture</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="mb-4">Certification</h2>
                <div class="grid grid-cols-4 gap-x-10 gap-y-8">
                    <div>
                        <p>2024</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">Three.js Journey Certificate of Completion</p>
                        <p>Online</p>
                        <p class="text-gray-500">
                            Completed the Three.js Journey course, demonstrating proficiency in 3D web
                            development using the Three.js library.
                        </p>
                    </div>
                    <div>
                        <p>2022</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p class="font-bold">License to Lead from CoA (Chief of Anything)</p>
                        <p>Online</p>
                        <p class="text-gray-500">
                            That certificate demonstrates that I participated in a year-long leadership training program. The training was intense, providing me with the expertise to lead a team effectively.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="mb-4">Contact</h2>
                <div class="grid grid-cols-4 gap-x-10 gap-y-2">
                    <div>
                        <p>Github</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>
                            <a href="https://github.com/dannystey" class="underline" target="_blank" rel="noopener noreferrer">https://github.com/dannystey</a>
                        </p>
                    </div>

                    <div>
                        <p>LinkedIn</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>
                            <a href="https://www.linkedin.com/in/danny-stey-59b357157/" class="underline" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/danny-stey-59b357157/</a>
                        </p>
                    </div>

                    <div>
                        <p>Email</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>
                            <a href="mailto:danny@steylish.de" class="underline" target="_blank" rel="noopener noreferrer">danny@steylish.de</a>
                        </p>
                    </div>

                    <div>
                        <p>Phone</p>
                    </div>
                    <div class="col-span-3 space-y-2">
                        <p>
                            <a href="tel:+49 173 65 28 134" class="underline" target="_blank" rel="noopener noreferrer">+49 173 65 28 134</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-4 mt-10 flex items-center justify-center print:hidden">
            <div onclick="{() => window.print()}">
                <Button icon="printer">Print</Button>
            </div>
        </div>
    </div>
</div>
