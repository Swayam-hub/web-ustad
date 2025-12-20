
import { FeatureGrid } from '@/components/new-home/BentoCard'
import { Dashboard } from '@/components/new-home/Dashboard'
import { Footer1 } from '@/components/new-home/Footer,'
import { Navbar } from '@/components/new-home/Header'
import Hero from '@/components/new-home/Hero'
import { CRMPreview } from '@/components/new-home/Preview'
import { Pricing } from '@/components/new-home/Pricing'
import SideBySideDemo from '@/components/new-home/SideBySide'
import React from 'react'

const Result = () => {
  return (
    <div>
      <Navbar />
        <Hero />
        <CRMPreview />
        <Pricing />
        <SideBySideDemo />
        <Dashboard />
        <FeatureGrid />
      <Footer1/>
    </div>
  )
}

export default Result
