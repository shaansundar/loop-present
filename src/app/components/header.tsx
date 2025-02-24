"use client"
import React from 'react'
import { useCheckSystemConnection } from '../hooks/api/check-system-connection';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';
const Header = () => {
    const { data, isLoading } = useCheckSystemConnection();

    return (
        <div className='w-full !h-16 border-b flex items-center justify-between px-4 py-2'>
            <h1 className='text-2xl font-bold'>Loop Present</h1>
            <Badge className={clsx('flex items-center gap-2', isLoading ? 'bg-yellow-500' : data?.Status ? 'bg-green-500' : 'bg-red-500')}>
                <p className='text-sm font-medium'>{isLoading ? 'Checking Connection...' : data?.Status ? 'Server Connected' : 'Server Not Found'}</p>
            </Badge>
        </div>
    )
}

export default Header