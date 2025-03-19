
import Footer from "./nogapaglava/footer"
import Header from "./nogapaglava/header"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const { default: Post } = await import(`~/clanki/${slug}.mdx`) as { default: React.ComponentType }


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4 md:p-8 lg:p-12">
                <article className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto prose prose-lg lg:prose-xl dark:prose-invert text-center md:text-left">
                    <Post />
                </article>
            </main>
            <Footer />
        </div>
    )
}

export function generateStaticParams() {
    return [{ slug: 'clanek1' },{ slug: 'clanek2' },{ slug: 'clanek3' },{ slug: 'clanek4' }]
}

export const dynamicParams = false