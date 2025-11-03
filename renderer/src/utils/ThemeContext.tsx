import React, { createContext, useContext, useMemo } from 'react'
import { Theme } from '../types'

interface ThemeContextValue {
  theme?: Theme
}

const ThemeContext = createContext<ThemeContextValue>({})

export const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  theme?: Theme
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const cssVariables = useMemo(() => {
    if (!theme) return {}

    const vars: Record<string, string> = {}

    if (theme.typography) {
      const { fontFamily, headingFontFamily, codeFontFamily, baseFontSize, lineHeight } = theme.typography
      if (fontFamily) vars['--nova-font-family'] = fontFamily
      if (headingFontFamily) vars['--nova-heading-font-family'] = headingFontFamily
      if (codeFontFamily) vars['--nova-code-font-family'] = codeFontFamily
      if (baseFontSize) vars['--nova-base-font-size'] = `${baseFontSize}px`
      if (lineHeight) vars['--nova-line-height'] = String(lineHeight)
    }

    if (theme.colors) {
      const { primary, background, text, accent } = theme.colors
      if (primary) vars['--nova-color-primary'] = primary
      if (background) vars['--nova-color-background'] = background
      if (text) vars['--nova-color-text'] = text
      if (accent) vars['--nova-color-accent'] = accent
    }

    if (theme.spacing) {
      const { paragraphSpacing, sectionSpacing } = theme.spacing
      if (paragraphSpacing) vars['--nova-paragraph-spacing'] = `${paragraphSpacing}rem`
      if (sectionSpacing) vars['--nova-section-spacing'] = `${sectionSpacing}rem`
    }

    return vars
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div style={cssVariables as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
