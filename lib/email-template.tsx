import {
    Button,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Tailwind,
} from "@react-email/components";

interface EmailTemplateProps {
    magicLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    magicLink,
}) => (
    <Html>
        <Head />
        <Preview>Log in with this magic link. 🎉</Preview>
        <Tailwind>
            <Heading className="mx-0 my-[30px] p-0 text-center text-3xl font-bold text-black">
                🎉Your magic link🎉
            </Heading>
            <Section className="my-[32px] text-center">
                <Button
                    className="text-md rounded bg-[#6C63FF] px-5 py-3 text-center font-semibold text-white no-underline"
                    href={magicLink}
                >
                    Click here to log in
                </Button>
            </Section>
        </Tailwind>
    </Html>
);
