import { REQUEST_APPROVE_STATUS } from '@/types'
import { isEqual, orderBy, unionWith } from 'lodash'
export const combineArrays = (array1: any, array2: any) => {
    const arr1 = Array.isArray(array1) ? array1 : []
    const arr2 = Array.isArray(array2) ? array2 : []

    const combined = unionWith(arr1, arr2, isEqual).map((item: any) => {
        if (arr1.includes(item)) {
            return { ...item, status: REQUEST_APPROVE_STATUS.APPROVED }
        } else {
            return { ...item, status: REQUEST_APPROVE_STATUS.PENDING }
        }
    })

    return orderBy(combined, 'updatedAt', 'desc')
}
