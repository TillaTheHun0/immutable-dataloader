
import DataLoader from 'dataloader'
import clone from 'lodash.clonedeep'

function deepClone (res: any) {
  return res ? clone(res) : res
}

export class ImmutableDataLoader<K, V, C = K> extends DataLoader<K, V, C> {
  async load (key: K) {
    return super.load(key).then(deepClone) as Promise<V>
  }

  async loadMany (keys: K[]) {
    return super.loadMany(keys).then(deepClone) as Promise<V[]>
  }
}
