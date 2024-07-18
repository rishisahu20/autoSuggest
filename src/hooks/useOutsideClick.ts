import { useEffect, RefObject } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (evt: MouseEvent) => {
            if (ref.current && !ref.current.contains(evt.target as Node)) {
                callback(); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useOutsideClick;
