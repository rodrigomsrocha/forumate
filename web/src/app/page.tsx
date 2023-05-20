import { DiscussionType } from '~/@types/app'
import { Discussion } from '~/components/Discussion'
import { api } from '~/lib/api'

export const metadata = {
  title: 'Home | Forumate',
}

export default async function Home() {
  const { data } = await api.get<{ discussions: DiscussionType[] }>(
    '/discussions',
  )

  return (
    <div className="flex flex-col gap-8 w-full">
      {data.discussions.map((discussion) => {
        return <Discussion key={discussion.id} discussion={discussion} />
      })}
    </div>
  )
}
