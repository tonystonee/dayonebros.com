<template>
    <div class="pa-5">
        <h3>Privacy Policy</h3>
        <p class="seo-date">
            Effective date: January 1, 2024
        </p>
        <p>
            DayOneBros respects your privacy. This policy explains what we collect, how we use it,
            and your choices when you use the Site.
        </p>
        <h4>Information We Collect</h4>
        <ul>
            <li>Basic usage data such as pages viewed and referral sources.</li>
            <li>Device and browser information for performance and security.</li>
            <li>IP address for fraud prevention and rate limiting.</li>
        </ul>
        <h4>How We Use Information</h4>
        <ul>
            <li>To operate and improve the Site.</li>
            <li>To monitor performance and prevent abuse.</li>
            <li>To understand which content is most helpful to visitors.</li>
        </ul>
        <h4>Cookies and Analytics</h4>
        <p>
            We may use cookies or similar technologies to remember preferences and measure
            site performance. You can control cookies through your browser settings.
        </p>
        <h4>Third-Party Services</h4>
        <p>
            The Site links to third-party platforms (such as video providers). Their privacy
            practices are governed by their own policies. We do not control or endorse them.
        </p>
        <h4>Children's Privacy</h4>
        <p>
            DayOneBros is not directed to children under 13. We do not knowingly collect
            personal information from children.
        </p>
        <h4>Contact</h4>
        <p>
            If you have questions about this Privacy Policy, contact us
            <a href="contact">here</a>.
        </p>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

defineOptions({ name: 'PrivacyPage' })

useHead({
  title: 'DayOneBros - privacy policy',
  meta: [
    {
      name: 'description',
      content: 'Privacy policy for DayOneBros, including data use and cookies.'
    }
  ]
})
</script>
