
import { ImmutableDataLoader } from './ImmutableDataLoader'

describe('ImmutableDataloader', () => {
  it('should return new instances on each access', async () => {
    const dl = new ImmutableDataLoader(
      async keys => {
        return keys.map(k => ({
          key: k,
          foo: 'bar'
        }))
      }
    )

    const firstP = dl.load(1)
    const secondP = dl.load(1)

    const [first, second] = await Promise.all([firstP, secondP])

    expect(first).not.toBe(second)
  })

  it('should return multiple new instances', async () => {
    const dl = new ImmutableDataLoader(
      async keys => {
        return keys.map(k => ({
          key: k,
          foo: 'bar'
        }))
      }
    )

    const firstP = dl.loadMany([1, 2])
    const secondP = dl.loadMany([1, 2])

    const [first, second] = await Promise.all([firstP, secondP])

    expect(first).not.toBe(second)
    expect(first[0]).not.toBe(second[0])
    expect(first[1]).not.toBe(second[2])
  })

  it('should return nil', async () => {
    const dl = new ImmutableDataLoader(
      async keys => {
        return keys.map(() => null)
      }
    )

    const res = await dl.load(1)

    expect(res).toBeNull()
  })
})
