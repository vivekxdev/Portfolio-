import { useEffect } from 'react'

/** Small, route-level document metadata helper. */
export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    if (!description) return

    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    const previous = tag.getAttribute('content')
    tag.setAttribute('content', description)

    return () => {
      if (previous !== null) tag.setAttribute('content', previous)
    }
  }, [title, description])
}
