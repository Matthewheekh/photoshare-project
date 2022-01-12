import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
    const [pins, setPins] = useState('')
    const [loading, setLoading] = useState(false)
    let { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        if (categoryId) {
            const query = searchQuery(categoryId)
            client.fetch(query).then((data) => {
                setLoading(false)
                setPins(data)
            })
        } else {
            const query = feedQuery
            client.fetch(query).then((data) => {
                setLoading(false)
                setPins(data)
                
            })
        }
    }, [categoryId])

    if (loading) {
        return (
            <Spinner message={`We are adding ${categoryId ? categoryId : 'items'} to your feed!`} />
        );
    }

    return (
        <div>
            {pins && (
                <MasonryLayout pins={pins} />
            )}
            {pins?.length === 0 && (
                <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                    No Pins Found!
                </div>
            )}
        </div>
    )
}

export default Feed
