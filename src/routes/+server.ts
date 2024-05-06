import { json } from '@sveltejs/kit'

export async function POST({ cookies }) {
  const userid = cookies.get('userid')
  console.log(userid)

  return json({ data: 'Hello World!' }, { status: 200 })
}
