import { Button } from '@/modules/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/modules/ui/dialog.tsx';

const NotConnectedDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Save</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>You are not connected.</DialogTitle>
          <DialogDescription>
            You need to be connected to save tricks.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild>
            <a href='/login'>Login</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotConnectedDialog;
