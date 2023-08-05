import React from 'react'
import { ServerStyleSheets } from '@mui/styles'
import Document, {
    Head,
    Html,
    Main,
    NextScript,
    DocumentProps,
    DocumentContext,
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '@/configs/createEmotionCache'

interface MyDocumentProps extends DocumentProps {
    emotionStyleTags: JSX.Element[]
}
export default function NNGMarketplaceDocument({ emotionStyleTags }: MyDocumentProps) {
    return (
        <Html lang="en">
            <Head>
                <meta name="theme-color" content="#1976d2" />
                {emotionStyleTags || ''}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

NNGMarketplaceDocument.getInitialProps = async (ctx: DocumentContext) => {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props: any) =>
                sheets.collect(<App {...props} emotionCache={cache} />),
        })

    const initialProps = await Document.getInitialProps(ctx)
    // This is important. It prevents Emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        emotionStyleTags,
    }
}
