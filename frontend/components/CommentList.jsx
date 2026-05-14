'use client'

import Link from 'next/link'
import Avatar from './Avatar'
import TimeAgo from './TimeAgo'

export default function CommentList({ comments, limit }) {
  if (!comments?.length) {
    return <p className="px-4 py-3 text-sm text-neutral-500">Seja o primeiro a comentar.</p>
  }

  const visible = limit ? comments.slice(-limit) : comments

  return (
    <ul className="divide-y divide-neutral-100">
      {visible.map((c) => (
        <li key={c.id} className="flex gap-3 px-4 py-3">
          <Avatar username={c.username} avatarUrl={c.avatarUrl} size="sm" />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <Link
                href={`/u/${c.username}`}
                className="text-sm font-semibold text-neutral-900 hover:underline"
              >
                @{c.username}
              </Link>
              <TimeAgo date={c.createdAt} />
            </div>
            <p className="break-words text-sm text-neutral-700">{c.content}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
