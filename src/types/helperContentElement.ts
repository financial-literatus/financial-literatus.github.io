/**
 * Interface
 */
export interface IHelperContentElement {
  "description": {
    "message": string,
    "img"?: string,
  }
  "links"?: Array<{
      "source": string,
      "type": string,
      "url": string
  }>
}