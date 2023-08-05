import { create, StateCreator, StoreMutatorIdentifier } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createUserSlice, UserSlice } from './slices/user'

type Logger = <
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
    f: StateCreator<T, Mps, Mcs>,
    name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T>(
    //@ts-ignore
    f: PopArgument<StateCreator<T, [], []>>,
    name?: string
    //@ts-ignore
) => PopArgument<StateCreator<T, [], []>>

const loggerImpl: LoggerImpl =
    (f, name) => (set: (arg0: any) => void, get: any, store: { setState: any }) => {
        type T = ReturnType<typeof f>

        const loggedSet: typeof set = (...a: any[]) => {
            /**@ts-ignore */
            set(...a)
            // console.log(...(name ? [`${name}:`] : []), get());
        }
        store.setState = loggedSet

        return f(loggedSet, get, store)
    }

export const logger = loggerImpl as unknown as Logger

export const useN2ArenaStore = create<UserSlice>()(
    logger(
        devtools(
            /** @ts-ignore */
            function (...a) {
                return {
                    /** @ts-ignore */
                    ...createUserSlice(...a),
                }
            }
        )
    )
)
