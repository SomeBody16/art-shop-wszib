export type AlertType = 'info' | 'danger' | 'success' | 'warning'

export type CommonAlertProps = {
    variant: AlertType
    icon?: any
    onDismiss?: () => void
}

export const colorOf = (type: AlertType) => {
    switch (type) {
        case 'info':
            return {
                text: 'text-blue-400',
                border: 'border-blue-800',
            }
        case 'danger':
            return {
                text: 'text-red-400',
                border: 'border-red-800',
            }
        case 'success':
            return {
                text: 'text-green-400',
                border: 'border-green-800',
            }
        case 'warning':
            return {
                text: 'text-yellow-400',
                border: 'border-yellow-800',
            }
    }
}
