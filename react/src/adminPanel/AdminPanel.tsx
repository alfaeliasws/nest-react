import React from 'react'
import { Panel } from './adminPanelComponent/Panel'

export type HeadlineType = {
    id: string  | "0",
    headliner: string  | "",
    topic: string | ""
}

function AdminPanel() {
  return (
    <>
        <Panel />
    </>
  )
}

export default AdminPanel