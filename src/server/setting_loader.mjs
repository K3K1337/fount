import { getUserDictionary } from "./auth.mjs"
import fs from 'fs'
import { saveJsonFile, loadJsonFile } from "./json_loader.mjs"

let userDataSet = {}
export function loadData(username, dataname) {
	userDataSet[username] ??= {}
	try {
		return userDataSet[username][dataname] ??= loadJsonFile(getUserDictionary(username) + '/settings/' + dataname + '.json')
	}
	catch (error) {
		return userDataSet[username][dataname] = {}
	}
}
export function saveData(username, dataname) {
	saveJsonFile(getUserDictionary(username) + '/settings/' + dataname + '.json', userDataSet[username][dataname])
}
