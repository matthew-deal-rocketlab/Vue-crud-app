import { ref, type Ref } from 'vue'

interface FetchState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
}

interface FetchOptions extends RequestInit {
  bearerToken?: string
}

interface UseFetchReturn<T> extends FetchState<T> {
  fetchData: (url: string, options?: FetchOptions) => Promise<T>
}

export function useFetch<T>(): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchData = async (url: string, options?: FetchOptions): Promise<T> => {
    loading.value = true
    error.value = null

    try {
      const headers = new Headers(options?.headers || {})
      if (options?.bearerToken) {
        headers.set('Authorization', `Bearer ${options.bearerToken}`)
      }

      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      data.value = result as T
      return result
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error('An unknown error occurred')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData }
}
