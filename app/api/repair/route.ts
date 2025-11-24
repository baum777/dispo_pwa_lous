import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  let name = '';
  let location = '';
  let area = '';
  let item = '';
  let description = '';

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    name = String(formData.get('name') ?? '');
    location = String(formData.get('location') ?? '');
    area = String(formData.get('area') ?? '');
    item = String(formData.get('item') ?? '');
    description = String(formData.get('description') ?? '');
    // TODO: handle file storage
  } else {
    const body = await request.json();
    name = body.name ?? '';
    location = body.location ?? '';
    area = body.area ?? '';
    item = body.item ?? '';
    description = body.description ?? '';
  }

  if (!name || !location || !area || !item || !description) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }

  // TODO: Persist to FileMaker layout "Reparatur_Web"
  // TODO: Optionally send email notification

  return NextResponse.json({ success: true });
}
