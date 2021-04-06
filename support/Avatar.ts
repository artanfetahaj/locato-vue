export default class Avatar {
  protected name = '';

  protected options: AvatarOptions = {
    initials: 'AT',
    color: '#FFFFFF',
    background: '#526880',
    size: 512,
    // height & width -> als een van de twee auto pak de waarde van de ander
  };

  constructor(name: string, options?: AvatarOptions) {
    this.options = { ...this.options, ...options };
    this.options.initials = this.generateInitials(name);
  }

  private generateInitials(name: string): string {
    if (! name) {
      return '';
    }
    const initials = name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g);

    if (initials) {
      const joined = initials.join('').toLowerCase();
      if (joined.length > 3) {
        return joined.substr(0, 3);
      }
      return joined.toUpperCase();
    }

    return '';
  }

  public toDataUrl(): string {
    const canvas = document.createElement('canvas');
    const width = this.options.size || 512;
    const height = this.options.size || 512;
    const fontSize = height / 2.5;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d', { alpha: false });
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = this.options.background || '#FFFFFF';
      context.fill();
      context.font = `${fontSize}px Open Sans`;
      context.textAlign = 'center';
      context.textBaseline = 'top';
      context.fillStyle = this.options.color || '#000000';

      context.fillText(this.options.initials || 'AT', (width / 2), (height / 2) - (fontSize / 2) + 5);
    }

    return canvas.toDataURL('image/png') || '';
  }
}

export interface AvatarOptions {
  initials?: string;
  color?: string;
  background?: string;
  size?: number;
}
