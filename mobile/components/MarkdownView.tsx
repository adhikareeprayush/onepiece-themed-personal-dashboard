import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions, type ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { Muted } from '@/components/Ui';
import { api, getApiUrl } from '@/lib/api';
import { colors, theme } from '@/lib/theme';

type Props = {
  markdown: string;
  token?: string | null;
  minHeight?: number;
  /** Stretch to fill parent (fullscreen reader). */
  fill?: boolean;
  style?: ViewStyle;
};

export function MarkdownView({ markdown, token, minHeight = 220, fill = false, style }: Props) {
  const { width } = useWindowDimensions();
  const [html, setHtml] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [webHeight, setWebHeight] = useState(minHeight);

  useEffect(() => {
    let alive = true;
    setHtml(null);
    setFailed(false);
    setWebHeight(minHeight);
    (async () => {
      try {
        const data = await api<{ html: string }>('/api/preview', {
          method: 'POST',
          token,
          body: { markdown: markdown || '' },
        });
        if (alive) setHtml(data?.html || '');
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [markdown, token, minHeight]);

  if (failed) {
    return <Text style={styles.plainBody}>{markdown || '(empty)'}</Text>;
  }

  if (html == null) {
    return (
      <View style={[styles.mdLoading, fill && styles.fill, { minHeight }, style]}>
        <ActivityIndicator color={colors.strawDeep} />
        <Muted>Rendering parchment…</Muted>
      </View>
    );
  }

  const doc = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<style>
  html, body { margin: 0; padding: 0; background: #fffdf6; color: #1a1008; }
  body { font: 17px/1.7 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 8px 4px 48px; }
  h1,h2,h3 { font-family: Georgia, "Times New Roman", serif; color: #0a2342; line-height: 1.25; }
  h1 { font-size: 1.7rem; } h2 { font-size: 1.4rem; } h3 { font-size: 1.15rem; }
  p, li { margin: 0.55em 0; }
  a { color: #0c3d87; }
  code { background: #f3e2b8; padding: 0.1em 0.35em; border-radius: 4px; font-size: 0.92em; }
  pre { background: #f3e2b8; padding: 10px; border-radius: 8px; overflow-x: auto; }
  pre code { background: transparent; padding: 0; }
  blockquote { margin: 0.8em 0; padding: 0.2em 0.8em; border-left: 4px solid #c41e3a; color: #5a4630; }
  img, iframe, video { max-width: 100%; height: auto; border-radius: 8px; }
  iframe { width: 100%; min-height: 200px; aspect-ratio: 16 / 9; }
  ul, ol { padding-left: 1.3em; }
  hr { border: 0; border-top: 2px solid rgba(26,16,8,0.15); margin: 1.2em 0; }
</style>
</head><body>${html}
<script>
  function postH() {
    var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, ${minHeight});
    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(String(h));
  }
  postH();
  setTimeout(postH, 200);
  setTimeout(postH, 800);
</script>
</body></html>`;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: doc, baseUrl: getApiUrl() }}
      style={[
        fill ? styles.fill : { width: Math.max(width - 64, 200), minHeight: webHeight, height: webHeight },
        { backgroundColor: '#fffdf6' },
        style,
      ]}
      scrollEnabled={fill}
      setSupportMultipleWindows={false}
      nestedScrollEnabled
      androidLayerType="hardware"
      onMessage={(event) => {
        if (fill) return;
        const next = Number(event.nativeEvent.data);
        if (Number.isFinite(next) && next > 0) setWebHeight(Math.max(minHeight, Math.ceil(next)));
      }}
    />
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, width: '100%', backgroundColor: '#fffdf6' },
  mdLoading: { alignItems: 'center', justifyContent: 'center', gap: 8 },
  plainBody: {
    fontFamily: theme.fonts.body,
    color: colors.ink,
    fontSize: 16,
    lineHeight: 24,
  },
});
