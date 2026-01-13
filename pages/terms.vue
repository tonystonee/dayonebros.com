<template>
    <div class="pa-5">
        <h3>Terms of Use</h3>
        <p class="seo-date mb-2">
            Effective date: January 1, 2024
        </p>
        <p>
            These Terms of Use govern your access to and use of DayOneBros.com (the "Site").
            By accessing or using the Site, you agree to these terms and our Privacy Policy.
            If you do not agree, do not use the Site.
        </p>
        <h4>1. The Service</h4>
        <p>
            DayOneBros curates and displays publicly available video information and links.
            We do not host the videos shown on the Site. Content is provided by third-party
            platforms, and your use of that content is subject to their terms.
        </p>
        <h4>2. Eligibility</h4>
        <p>
            You must be at least 13 years old to use the Site. If you are under 18, you must
            have permission from a parent or guardian.
        </p>
        <h4>3. Acceptable Use</h4>
        <ul>
            <li>Do not use the Site for unlawful purposes or in violation of any laws.</li>
            <li>Do not scrape, harvest, or mass-download content from the Site.</li>
            <li>Do not interfere with or disrupt the Site or its services.</li>
            <li>Do not misrepresent your identity or your affiliation with DayOneBros.</li>
        </ul>
        <h4>4. Intellectual Property</h4>
        <p>
            The Site, its design, and its original content are owned by DayOneBros and are
            protected by intellectual property laws. You may not copy, modify, distribute,
            or create derivative works from the Site without prior written permission.
        </p>
        <h4>5. Third-Party Content and Links</h4>
        <p>
            The Site contains links to and embeds from third-party services. We are not
            responsible for third-party content, policies, or practices. Your interactions
            with third parties are solely between you and them.
        </p>
        <h4>6. Disclaimers</h4>
        <p>
            The Site is provided on an "as is" and "as available" basis. We make no warranties
            of any kind, express or implied, including warranties of merchantability, fitness
            for a particular purpose, or non-infringement.
        </p>
        <h4>7. Limitation of Liability</h4>
        <p>
            To the maximum extent permitted by law, DayOneBros will not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or for any
            loss of profits or data, arising from your use of the Site.
        </p>
        <h4>8. Changes to These Terms</h4>
        <p>
            We may update these Terms from time to time. The effective date above will be
            updated when changes are made. Your continued use of the Site means you accept
            the updated Terms.
        </p>
        <h4>9. Contact</h4>
        <p>
            Questions about these Terms? Contact us
            <a href="contact">here</a>.
        </p>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

defineOptions({ name: 'TermsPage' })

useHead({
  title: 'DayOneBros - terms of service',
  meta: [
    {
      name: 'description',
      content: 'Terms of service for DayOneBros, including acceptable use and disclaimers.'
    }
  ]
})
</script>
