import { APCA_BROKER_API_KEY_ID, APCA_BROKER_API_SECRET_KEY } from '$env/static/private'

const merged_keys = `${APCA_BROKER_API_KEY_ID}:${APCA_BROKER_API_SECRET_KEY}`

const auth = Buffer.from(merged_keys).toString('base64')

export const myHeaders = new Headers()
myHeaders.append('Accept', 'application/json')
myHeaders.append('Authorization', `Basic ${auth}`)
