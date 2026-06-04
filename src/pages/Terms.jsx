import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="grid-bg fixed inset-0 opacity-40 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors font-mono text-sm mb-12">
          <ArrowLeft className="h-4 w-4" /> Back to AutomateFlows
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-12">Last updated June 2026</p>

        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Engagement</h2>
            <p>AutomateFlows provides custom AI automation, content pipeline, and web application development services. The specific scope, deliverables, and timeline for each engagement are agreed in writing before work begins.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Quotes & pricing</h2>
            <p>Pricing tiers shown on this site are indicative. Every project is custom-scoped, and a firm quote is provided after a discovery call. Retainers are billed monthly and may be cancelled with reasonable notice.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Deliverables & ownership</h2>
            <p>On full payment, you own the automation systems and code built specifically for your business. Third-party tools, models, and platforms remain subject to their own licences and terms.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Support</h2>
            <p>Each tier includes a defined post-launch support window. Ongoing monitoring, maintenance, and feature additions are available under a monthly retainer.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Liability</h2>
            <p>We deliver our work with professional care, but automation systems depend on third-party platforms and APIs we do not control. AutomateFlows is not liable for outages, changes, or losses caused by those external services.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:hello@automateflows.org" className="text-accent hover:underline">hello@automateflows.org</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
