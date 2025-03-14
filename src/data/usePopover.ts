import { useState, type MouseEvent } from "react";

export function usePopover<T>() {
	const [anchor, setAnchor] = useState<HTMLElement | null>(null);
	const [data, setData] = useState<T | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const open = (event: MouseEvent<HTMLElement>, data: T) => {
		setAnchor(event.currentTarget);
		setData(data);
		setIsOpen(true);
	};

	const close = () => {
		setAnchor(null);
		setData(null);
		setIsOpen(false);
	};

	return { anchor, setAnchor, open, close, isOpen, data };
}
