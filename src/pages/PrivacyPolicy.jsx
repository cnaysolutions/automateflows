import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="grid-bg fixed inset-0 opacity-40 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors font-mono text-sm mb-12">
          <ArrowLeft className="h-4 w-4" /> Back to AutomateFlows
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-12">Last updated June 2026</p>

        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Who we are</h2>
            <p>AutomateFlows is an independent AI automation studio based in Brussels, Belgium. You can reach us any time at <a href="mailto:hello@automateflows.org" className="text-accent hover:underline">hello@automateflows.org</a>.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">What we collect</h2>
            <p>When you contact us through the form or by email, we collect the details you choose to share — typically your name, email address, and a description of your project. We use this information solely to respond to your enquiry and scope potential work.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">How we use it</h2>
            <p>Your information is used only to communicate with you about your project. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Data retention</h2>
            <p>We keep enquiry correspondence for as long as needed to provide our services and meet legal obligations. You may request deletion of your data at any time by emailing us.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Your rights</h2>
            <p>As an EU-based business, we respect your rights under the GDPR, including the right to access, correct, or delete your personal data. To exercise any of these rights, contact <a href="mailto:hello@automateflows.org" className="text-accent hover:underline">hello@automateflows.org</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
