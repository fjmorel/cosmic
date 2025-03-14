import { MenuItem, type MenuItemProps } from "@mui/material";
import { Link, useMatchRoute, type RegisteredRouter, type ValidateToPath } from "@tanstack/react-router";

type RouterButtonProps = {
	to: ValidateToPath<RegisteredRouter>;
	title: string;
} & MenuItemProps;

export default function RouterButton({ title, to }: RouterButtonProps) {
	const matchRoute = useMatchRoute();
	const isActive = matchRoute({
		to: to,
	})
		? true
		: false;

	return (
		<MenuItem component={Link} to={to} selected={isActive}>
			{title}
		</MenuItem>
	);
}
