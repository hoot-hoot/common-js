import { Env, isForDevelopment } from './env'


/**
 * An annotation for methods which should only be called in a dev-context,
 * as identified by {@link isForDevelopment}.
 * @note Assumes that the environment is some static application-level configuration, such as
 *     a constant read from a config file or from the environment.
 * @param env - the current environment the system is running in.
 */
export function devOnly(env: Env) {
    return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
        const original = descriptor.value;

        descriptor.value = (...args: any[]) => {
            if (!isForDevelopment(env)) {
                throw new Error('Calling dev only code in a non-dev environment');
            }

            return original(...args);
        };

        return descriptor;
    }
}
