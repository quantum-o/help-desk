type Props = {
	title?: string;
	description?: string;
};

const HeaderText = ({ title, description }: Props) => {
	return (
		<div className="w-full flex flex-col gap-2">
			{title && <h3>{title}</h3>}
			{description && <p className="text-muted-foreground">{description}</p>}
		</div>
	);
};

export default HeaderText;
