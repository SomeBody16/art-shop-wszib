export class FormDataUtil {
    public static async create(form: FormData | Promise<FormData>): Promise<FormDataUtil> {
        return new FormDataUtil(await form)
    }

    protected constructor(protected readonly form: FormData) {}

    public getString(key: string): string | undefined
    public getString(key: string, defaultValue: string): string
    public getString(key: string, defaultValue?: string): string | undefined {
        return this.get({
            key,
            defaultValue,
        })
    }

    public getInteger(key: string): number | undefined
    public getInteger(key: string, defaultValue: number): number
    public getInteger(key: string, defaultValue?: number): number | undefined {
        return this.get({
            key,
            defaultValue,
            transform: (value) => {
                const intValue = parseInt(value)
                return isNaN(intValue) ? defaultValue : intValue
            },
        })
    }

    public getFloat(key: string): number | undefined
    public getFloat(key: string, defaultValue: number): number
    public getFloat(key: string, defaultValue?: number): number | undefined {
        return this.get({
            key,
            defaultValue,
            transform: (value) => {
                const floatValue = parseFloat(value)
                return isNaN(floatValue) ? defaultValue : floatValue
            },
        })
    }

    protected get<R = string>(props: {
        key: string
        transform?: (value: string) => R | undefined
        defaultValue?: R
    }): R | undefined {
        if (this.form.has(props.key)) {
            const value = this.form.get(props.key)?.toString() as string
            if (props.transform) {
                return props.transform(value) || undefined
            }
            return value as R
        }
        return props.defaultValue || undefined
    }
}
