export function appendFormData(data: any, root: string, formData: FormData) {
	if (data instanceof File)
		return formData.append(root, data)
	if (Array.isArray(data)) {
		for (let i = 0; i < data.length; i++) {
			appendFormData(data[i], `${root}[${i}]`, formData)
		}

		return
	}
	if (typeof data === "object" && data) {
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				if (root === "")
					appendFormData(data[key], key, formData)
				else
					appendFormData(data[key], `${root}.${key}`, formData)
			}
		}

		return
	}
	if (data !== null && typeof data !== "undefined")
		return formData.append(root, data)
}

export function objectToFormData(obj: any, rootName: string = "") {
	const formData = new FormData()

	appendFormData(obj, rootName, formData)

	return formData
}