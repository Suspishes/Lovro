import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Heading,
    Text,
} from '@react-email/components';

export default function ContactEmail({
    name,
    email,
    phone,
    message,
}: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    return (
        <Html>
            <Head />
            <Preview>Novo sporočilo s spletne strani</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Novo sporočilo</Heading>
                    <Section>
                        <Text style={text}><strong>Ime:</strong> {name}</Text>
                        <Text style={text}><strong>Email:</strong> {email}</Text>
                        <Text style={text}><strong>Telefon:</strong> {phone}</Text>
                        <Text style={text}><strong>Sporočilo:</strong></Text>
                        <Text style={messageText}>{message}</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#ffffff",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const h1 = {
    fontSize: "24px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#6CA748",
};

const text = {
    fontSize: "16px",
    lineHeight: "1.4",
    color: "#1f2937",
    margin: "4px 0",
};

const messageText = {
    ...text,
    padding: "8px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
};