export default class RenderHelper {
  private static stringLength: number = 50;

  public static truncateContent(content: string) {
    return content.length > 50
      ? `${content.substring(0, this.stringLength)}...`
      : content;
  }
}
