<template>
    <div class="pa-5">
        <h3>Copyright Policy</h3>
        <p class="seo-date mb-2">
            Effective date: January 1, 2024
        </p>
        <p>
            DayOneBros respects the intellectual property rights of others. We display
            publicly available video information and links, and we do not host the videos
            shown on the Site.
        </p>
        <h4>Copyright Concerns</h4>
        <p>
            If you believe a video link on DayOneBros infringes your copyright, please contact us
            <a href="contact">here</a> with the information below. We will review and respond
            to properly submitted requests.
        </p>
        <ol>
            <li>The URL of the video or page on DayOneBros.</li>
            <li>Your name and contact information (email and mailing address).</li>
            <li>A brief description of the copyrighted work.</li>
            <li>A statement that you have a good-faith belief the use is not authorized.</li>
            <li>A statement that the information is accurate and you are the copyright owner or authorized to act.</li>
            <li>Your physical or electronic signature.</li>
        </ol>
        <h4>Counter-Notice</h4>
        <p>
            If you believe your content was removed in error, you may contact us with a
            counter-notice including your contact information, the URL, and a statement
            under penalty of perjury that you have a good-faith belief the removal was a mistake.
        </p>
    </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

defineOptions({ name: 'CopyrightPage' })

useHead({
  title: 'DayOneBros - copyright policy',
  meta: [
    {
      name: 'description',
      content: 'Copyright policy and takedown instructions for DayOneBros.'
    }
  ]
})
</script>
