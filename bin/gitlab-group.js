#!/usr/bin/env node

const { prefix, private_token, remove, groupName } = (() => {
	const args = require('minimist')(process.argv.slice(2))

	const { prefix, token, _: [ name ] } = args
	const groupName = name || args.delete
	const remove = args.delete !== undefined

	return { prefix, private_token: token, remove, groupName }
})()

const querystring = require('querystring')
const axios = require('axios').create({
	baseURL: `${prefix}/api/v4`,
	timeout: 10000,
})

const gfind = () => new Promise((resolve, reject) => {
	axios({
		method: 'get',
		url: `/groups?${querystring.stringify({
			private_token,
			owned: true,
			per_page: 100,
		})}`,
	})
	.then(({ data }) => data.filter(({ path }) => groupName === path).shift())
	.then(group => {
		if (group === undefined)
			reject()
		else
			resolve(group)
	})
	.catch(reject)
})

const gcreate = () => axios({
		method: 'post',
		url: `/groups?${querystring.stringify({
			private_token,
			path: groupName,
			name: groupName,
			visibility: 'public',
		})}`,
	})
	.then(({ data }) => data)

const gdelete = (id) => axios({
		method: 'delete',
		url: `/groups/${id}?${querystring.stringify({
			private_token,
		})}`,
	})
	.then(() => ({ success: true }))

const mcreate = () => new Promise((resolve, reject) => gfind().then(resolve, () => gcreate().then(resolve, reject)))
const mdelete = () => new Promise((resolve, reject) => gfind().then(({ id }) => gdelete(id).then(resolve, reject), () => resolve({ success: true })))
const main = remove ? mdelete : mcreate

main().then
( res => console.log(JSON.stringify(res))
, err => console.error(err.stack)
)