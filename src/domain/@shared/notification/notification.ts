export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private _errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this._errors.push(error);
    }

    get errors(): NotificationErrorProps[] {
        return this._errors;
    }

    messages(context?: string): string {
        return this.errors
            .filter((e) => context === undefined || e.context === context)
            .map((e) => `${e.context}: ${e.message}`)
            .join(", ");
    }

    hasErrors() {
        return this.errors.length > 0;
    }
}