import {
	Document,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";

interface Props {
	images?: string[];
	description?: string;
	contact?: { type: string; value: string }[];
}

const styles = StyleSheet.create({
	image: {
		marginVertical: 15,
		marginHorizontal: 30,
	},
	title: {
		fontSize: 36,
		textAlign: "center",
		fontWeight: "bold",
		marginTop: 15,
	},
});

export default function Template01(props: Props) {
	return (
		<Document>
			<Page size="A4">
				<Text style={styles.title}>Desaparecida</Text>
				{(props.images?.length || 0) > 0 && (
					<Image src={`/api/images/${props.images![0]}`} style={styles.image} />
				)}
				{props.description && (
					<Text style={{ marginHorizontal: 15 }}>{props.description}</Text>
				)}

				{props.contact && (
					<View
						style={{
							justifyContent: "center",
							marginTop: "auto",
							marginHorizontal: 15,
							marginBottom: 15,
							fontSize: 24,
						}}
					>
						{props.contact.map((contact) => (
							<Text key={contact.value}>• {contact.value}</Text>
						))}
					</View>
				)}
			</Page>
		</Document>
	);
}
