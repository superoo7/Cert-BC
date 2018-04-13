import { TransactionData, Cert } from '../data/class'

export default class Transaction implements TransactionData {
  public cert: Cert | boolean
  public error: undefined | { name: string; type: boolean }[]
  constructor(public createdTime: number, cert: Cert) {
    let type = this.typecheck(cert)
    if (type.success) {
      this.cert = {
        address: cert.address,
        avatar: cert.avatar,
        category: cert.category,
        country: cert.country,
        date: cert.date,
        documents: {
          ideaku: {
            _id: cert.documents.ideaku._id,
            hash: cert.documents.ideaku.hash,
            certificate: cert.documents.ideaku.certificate,
            payment: cert.documents.ideaku.payment,
            receipt: cert.documents.ideaku.receipt
          }
        },
        latitude: cert.latitude,
        lngitude: cert.lngitude,
        media: cert.media,
        media_name: cert.media_name,
        name: cert.name,
        isPrivate: cert.isPrivate,
        title: cert.title
      }
      this.error = []
    } else {
      this.cert = false
      this.error = type.error
    }
  }

  public typecheck(cert: Cert): { success: boolean; error?: { name: string; type: boolean }[] } {
    console.log(this.dataCheck(cert))

    let b: { name: string; type: boolean }[] = this.dataCheck(cert).filter(e => !e.type)
    if (b.length === 0) {
      return { success: true }
    } else {
      console.log(b)
      return { success: false, error: b }
    }
  }

  public dataCheck(data: any): { name: string; type: boolean }[] {
    return [
      { name: 'address', type: typeof data.address === 'string' },
      { name: 'avatar', type: typeof data.avatar === 'string' },
      { name: 'category', type: typeof data.category === 'string' },
      { name: 'country ', type: typeof data.country === 'string' },
      { name: 'date', type: typeof data.date === 'number' },
      { name: '_id', type: typeof data.documents.ideaku._id === 'string' },
      { name: 'hash', type: typeof data.documents.ideaku.hash === 'string' },
      { name: 'certificate', type: typeof data.documents.ideaku.certificate === 'number' },
      { name: 'payment', type: typeof data.documents.ideaku.payment === 'string' },
      { name: 'receipt', type: typeof data.documents.ideaku.receipt === 'number' },
      { name: 'latitude', type: typeof data.latitude === 'number' },
      { name: 'media', type: typeof data.media === 'string' },
      { name: 'mediaName', type: typeof data.media_name === 'string' },
      { name: 'name', type: typeof data.name === 'string' },
      { name: 'isPrivate', type: typeof data.isPrivate === 'boolean' },
      { name: 'title', type: typeof data.title === 'string' }
    ]
  }
}
