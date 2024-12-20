import { CohereClientV2 } from 'cohere-ai'
import { margeStructPromptChatLog, structPromptToSingleNoChatLog } from '../../shells/chat/src/server/prompt_struct.mjs'
/** @typedef {import('../../../decl/AIsource.ts').AIsource_t} AIsource_t */
/** @typedef {import('../../../decl/prompt_struct.ts').prompt_struct_t} prompt_struct_t */

export default async (config) => {
	let cohere = new CohereClientV2({
		token: config.apikey,
	})
	/** @type {AIsource_t} */
	let result = {
		type: 'text-chat',
		info: {
			'': {
				avatar: '',
				name: config.name || config.model,
				description: 'cohere',
				description_markdown: 'cohere',
				version: '0.0.0',
				author: 'steve02081504',
				homepage: '',
				tags: ['cohere'],
			}
		},
		is_paid: false,
		extension: {},

		Unload: () => { },
		Call: async (prompt) => {
			const result = await cohere.generate({prompt, model: config.model})
			return result.generations.map((generation) => generation.text).join('\n')
		},
		StructCall: async (/** @type {prompt_struct_t} */ prompt_struct) => {
			let system_prompt = structPromptToSingleNoChatLog(prompt_struct)
			let request = {
				model: config.model,
				messages: [{
					role: 'system',
					content: system_prompt
				}]
			}
			margeStructPromptChatLog(prompt_struct).forEach((chatLogEntry) => {
				request.messages.push({
					role: chatLogEntry.role === 'user' ? 'user' : chatLogEntry.role === 'system' ? 'system' : 'assistant',
					content: chatLogEntry.name + ':\n' + chatLogEntry.content
				})
			})

			let result = await cohere.chat(request)
			let text = result?.message?.content?.map((message) => message?.text)?.filter((text) => text)?.join('\n')
			if (!text) throw result
			if (text.match(new RegExp(`^${prompt_struct.Charname}(:|：)\n`, 'ig')))
				text = text.split('\n').slice(1).join('\n')

			return text
		},
		Tokenizer: {
			free: () => 0,
			encode: (prompt) => cohere.tokenize({
				model: config.model,
				text: prompt
			}).then((result) => result.tokens),
			decode: (tokens) => cohere.detokenize({
				model: config.model,
				tokens: tokens
			}).then((result) => result.text),
			decode_single: (token) => cohere.detokenize({
				model: config.model,
				tokens: [token]
			}).then((result) => result.text),
			get_token_count: (prompt) => cohere.tokenize({
				model: config.model,
				text: prompt
			}).then((result) => result.tokens.length)
		}
	}

	return result
}
